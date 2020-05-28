
//////////////////////////////////////////////// Alarm Control Panel setup ///////////////////////////////////////////////////////////////////////////

#include <LiquidCrystal_I2C.h>
#include <Keypad.h>
#include "SipHash_2_4.h"

uint8_t hashKey[] = {0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x00, 0x00};

const byte ROWS = 4;
const byte COLS = 4;

char hexaKeys[ROWS][COLS] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'}
};

byte rowPins[ROWS] = {22, 24, 26, 28};
byte colPins[COLS] = {30, 32, 34, 36};

char keypadList[] = {'x','x', 'x', 'x'}; 
int keypadCnt = 0;

Keypad keypad = Keypad(makeKeymap(hexaKeys), rowPins, colPins, ROWS, COLS);

LiquidCrystal_I2C lcd(0x27, 1, 2);  



//////////////////////////////////////////////// LMIC and common setup ///////////////////////////////////////////////////////////////////////////

#include <EEPROM.h>
#include <Wire.h> 

int cal_cnt = 0;
int refDist = -1;
int distCnt = 0;
int pwFlag = 0;
int panicFlag = 0;
int armFlag = 0;
int alarmFlag = 0;

#include <lmic.h>
// MIT License
// https://github.com/gonzalocasas/arduino-uno-dragino-lorawan/blob/master/LICENSE
// Based on examples from https://github.com/matthijskooijman/arduino-lmic
// Copyright (c) 2015 Thomas Telkamp and Matthijs Kooijman


#include <hal/hal.h>


// Initialise short and long payloads. The last byte is dead and is never received.
uint8_t shortMessage[] = {1, 1, 1, 99};
uint8_t longMessage[] = {1, 1, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 99}; // unused by sensor nodes

int t_start = 0;
int t_wait = 10000; // time in ms to wait until sensors activate to guarantee correct calibration

static const u1_t NWKSKEY[16] = { 0x6E, 0xA5, 0xD8, 0x03, 0x4C, 0xB7, 0xBB, 0x93, 0x65, 0xBB, 0xDE, 0x95, 0x1D, 0x2F, 0x01, 0x3B };
static const u1_t APPSKEY[16] = { 0x31, 0x52, 0x01, 0x40, 0x8A, 0xAE, 0x74, 0xDE, 0x59, 0x03, 0x49, 0xC0, 0x4A, 0x41, 0x88, 0x7D };
static const u4_t DEVADDR = 0x26011C80;

// The LMIC library requires that these variables are set, but they are not used.
void os_getArtEui (u1_t* buf) { }
void os_getDevEui (u1_t* buf) { }
void os_getDevKey (u1_t* buf) { }

static osjob_t sendjob;


// Delay in seconds between TX ending and starting new TX
int TX_delay = 150;

// Pin mapping for using the Dragino Shield
const lmic_pinmap lmic_pins = {
    .nss = 10,
    .rxtx = LMIC_UNUSED_PIN,
    .rst = 9,
    .dio = {2, 6, 7},
};

void onEvent (ev_t ev) {
    Serial.print("ev: ");
    Serial.println(ev);
    switch(ev) {
      case EV_TXCOMPLETE:
        Serial.println("TX + RX windows complete");
        Serial.println(LMIC.seqnoUp);
        if (LMIC.dataLen) {
            Serial.print(F("Data received - "));
            Serial.print("frame: ");
            Serial.write(LMIC.frame, 2);
            Serial.print(", dataBeg: ");
            Serial.print(LMIC.dataBeg);
            Serial.print(", len: ");
            Serial.println(LMIC.dataLen);
            Serial.print("all: ");
            Serial.write(LMIC.frame + LMIC.dataBeg, LMIC.dataLen);
            Serial.println();
            Serial.println(LMIC.frame[LMIC.dataBeg+0]);
            Serial.println(LMIC.frame[LMIC.dataBeg+1]);
            Serial.println(LMIC.frame[LMIC.dataBeg+2]);

          // The value 0 introduces weird errors when using TTN. For payload 1 is false and 2 is true.
          if (LMIC.frame[LMIC.dataBeg+0] == 2) {

            if (armFlag == 0) {
              lcd.setCursor(0,1);
              lcd.print("Armed           ");

              // Calibrate sensor
              refDist = getRefDist();
            }
            armFlag = 1;
          }
          else if (LMIC.frame[LMIC.dataBeg+0] == 1) {
            if (armFlag == 1) {
              lcd.setCursor(0,1);
              lcd.print("Disarmed        ");
            }
            armFlag = 0;
          }

          if (LMIC.frame[LMIC.dataBeg+1] == 1) {
            panicFlag = 0;
          }
            
        }   
        eepromUpdate();
        // Set time for next TX
        os_setTimedCallback(&sendjob, os_getTime()+sec2osticks(TX_delay), do_send);
        break;
      default:
        Serial.print("ev: ");
        Serial.println(ev);
        break;
    }
}

void do_send(osjob_t* j){
    // Update uplink TX payload
    
    // Update iff there isn't currently a TX happening
    if (!(LMIC.opmode & OP_TXRXPEND)) {
        // The value 0 introduces weird errors when using TTN. For payload 1 is false and 2 is true.
        
        // Arm status
        shortMessage[0] = armFlag + 1;
        longMessage[0] = armFlag + 1;

        // Panic status
        shortMessage[1] = panicFlag + 1;
        longMessage[1] = panicFlag + 1;

        // Alarm status
        shortMessage[2] = alarmFlag + 1;
        longMessage[2] = alarmFlag + 1;
        
        // Set payload message to include hash of the entered password, if '#' has been pressed on the keypad
        if (pwFlag == 1) {
          LMIC_setTxData2(1, longMessage, sizeof(longMessage)-1, 0);
          pwFlag = 0;
        }
        // Otherwise just use the short payload format to reduce airtime
        else {
          LMIC_setTxData2(1, shortMessage, sizeof(shortMessage)-1, 0);
        }
        Serial.println("Sending uplink TX");
    }
}

void eepromUpdate() {
  // Convert frame counters up and down to two byte each so they can be stored in EEPROM
  byte upHigh = (LMIC.seqnoUp & 0xFF00) / 256;
  byte upLow = LMIC.seqnoUp & 0x00FF;
  byte dnHigh = (LMIC.seqnoDn & 0xFF00) / 256;
  byte dnLow = LMIC.seqnoDn & 0x00FF;
  EEPROM.write(0, upHigh);
  EEPROM.write(1, upLow);
  EEPROM.write(2, dnHigh);
  EEPROM.write(3, dnLow);
  Serial.println("EEPROM:");
  Serial.println(upHigh);
  Serial.println(upLow);
  Serial.println(dnHigh);
  Serial.println(dnLow);
}

//////////////////////////////////////////////// LMIC and common setup ///////////////////////////////////////////////////////////////////////////



void setup(){
  Serial.begin(9600);
  Serial.println("booting");

  pinMode(A0, INPUT);
  pinMode(A1, INPUT);
  
  t_start = millis();

  // Initialise LMIC
  os_init();
  LMIC_reset();
  LMIC_setSession (0x1, DEVADDR, NWKSKEY, APPSKEY);
  LMIC_setLinkCheckMode(0);

  // This is increased from 1/100 to avoid losing downlink payload
  LMIC_setClockError(MAX_CLOCK_ERROR * 10 / 100); 

  // Downlink datarate. TTN uses SF9 for the RX2 window
  LMIC.dn2Dr = DR_SF9;

  // Uplink datarate is set to SF7 to reduce airtime as much as possible
  LMIC_setDrTxpow(DR_SF12,14);


  // Read frame counters from non-volatile memory
  byte eeprom0 = EEPROM.read(0);
  byte eeprom1 = EEPROM.read(1);
  byte eeprom2 = EEPROM.read(2);
  byte eeprom3 = EEPROM.read(3);

  // Update frame counters up and down iff EEPROM hasn't been reset
  if (eeprom0 != 255 && eeprom1 != 255 && eeprom2 != 255 && eeprom3 != 255) {
    Serial.println("Reading frame counters from EEPROM");
    LMIC.seqnoUp = eeprom0*256 + eeprom1;
    LMIC.seqnoDn = eeprom2*256 + eeprom3;
  }

  // Send first message
  do_send(&sendjob);

/////////// Device specific setup here ///////////

    // Initialise lcd
  lcd.init(); 
  lcd.backlight();
  lcdReset();

  // Initialise keypad
  keypad.addEventListener(keypadPress);
} 

void loop(){
  os_runloop_once();

  
 if ( millis() > t_start + t_wait) {

    ////////////////// Sensor specific loop code here //////////////////

    // trigger if the PIR output is high
    if (analogRead(0) > 500 && armFlag == 1) {
      Serial.println("ALARM!");
      alarmFlag = 1;
    }
    

  }
  ////////////////////////////////////////////////////////////////////
  
  // Use keypad
  char customKey = keypad.getKey();  

  // Use panic button 
  if (panicButton() && panicFlag == 0) {
    panicFlag = 1;
        
    // Write to lcd
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Panic mode");
    lcd.setCursor(0,1);
    lcd.print("Activated");
  }
}

////////////////// Alarm Control Panel functions for LCD and keypad //////////////////

void lcdReset() {
  // Reset lcd
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Enter pw:        ");
  lcd.setCursor(0,1);
  lcd.print("Disarmed         ");
}

void keypadPress(KeypadEvent kpp) {
  switch(keypad.getState()) {
    case PRESSED:
    char kpInput = kpp;
    lcd.setCursor(14, 2); 
    lcd.print(kpInput);
    Serial.print(keypadCnt);
    Serial.print(", ");
    Serial.println(kpInput);

    switch(kpInput) {
      case '*':
        // Delete entered password
        keypadCnt = 0;
        lcd.setCursor(9,0);
        lcd.print("       ");
        break;
      case '#':
        // Submit password
        if (keypadCnt == 4) {
          hashKey[14] = (byte) EEPROM.read(0);
          hashKey[15] = (byte) EEPROM.read(1);
          sipHash.initFromRAM(hashKey);

          Serial.println("Keypad input as int: ");
          
          for (int i=0; i<4;i++) {
            sipHash.updateHash((byte)keypadList[i]); // update hash with each byte of msg
            Serial.println((byte)keypadList[i]);
          }
          sipHash.finish();
          for(int i=0; i<16;i++) {
            longMessage[i+3] = sipHash.result[i];
          }
          
          pwFlag = 1;

          // Write to lcd
          lcd.setCursor(0,1);
          lcd.print("Waiting for ack.");

          // reset entered password
          keypadCnt = 0;
          lcd.setCursor(9,0);
          lcd.print("       ");
        }
        break;
      case 'A':
        break;
      case 'B':
        break;
      case 'C':
        break;
      case 'D':
        break;
      case '0' ... '9':
        if (keypadCnt <= 3) {
          keypadList[keypadCnt] = kpInput;
          lcd.setCursor(9+keypadCnt,0);
          lcd.print('*');
          keypadCnt++;
        }
        break;
    }
  }
}

bool panicButton() {
  if (analogRead(1) > 900) {
    Serial.println("Panic button pressed");
    return true;
  }
  else {
    return false;
  }
}

////////////////// Sensor specific non-loop code here //////////////////
  
int getRefDist() {
  /*
    // Calibrate ultra sonic sensor
    
    int distSum = 0;
    for (int i=0; i<100; i++) {
      distSum = distSum + analogRead(0);
      delay(49); // maximum cycle time for LV-MaxSonar MB1000
    }
    distSum = distSum / 100;
    Serial.print("refDist = ");
    Serial.print(distSum);
    Serial.println(" cm");

    return distSum;
  */
}
