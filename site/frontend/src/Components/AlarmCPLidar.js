import React, { useState } from "react";
import { Tooltip, ListGroup, ListGroupItem, Col, Row } from "reactstrap";

const AlarmCPLidar = props => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div>
      <h1>Control Panel - LIDAR</h1>
      <p>
        Somewhere in here is a setup{" "}
        <span style={{ textDecoration: "underline", color: "blue" }} href="#" id="TooltipExample">
          tooltip
        </span>
        .
      </p>
      <Tooltip placement="right" isOpen={tooltipOpen} target="TooltipExample" toggle={toggle}>
        Hello, I'm a Tooltip!
      </Tooltip>
      
      <Row>
        <Col>
          <p>Image of completed product next to parts list?</p>
        </Col>
        <Col>
          <h3>You will need:</h3>
          <ul>
            <li>3 TTN Device values provided by your local server administrator</li>
            <li>1 Arduino Mega 2560</li>
            <li>1 LoRa shield</li>
            <li>1 4x4 Keypad</li>
            <li>1 16x2 LCD with I2C interface</li>
            <li>1 breadboard</li>
            <li>1 push button</li>
            <li>1 &lt;1kω resistor</li>
            <li>1 LIDAR-Lite v3 with cables</li>
            <li>5 jumper or male-to-male wires</li>
            <li>1 usb A to B cable</li>
            <li>1 9V power supply OR 1 5V wall mount USB adaptor</li>
          </ul>
        </Col>
      </Row>
      <h2>Building a Control Panel</h2>
      <p>The basis of a Control Panel is an Arduino[An Arduino is a small computer that can run special Arduino software]. This device uses an Arduino Mega 2560 (as opposed to the smaller, less expensive Arduino UNO used for Sensor Nodes), as only the larger board supplies sufficient memory to run a Control Panel.</p>
      <p>Basic diagram</p>
      <h3>Arduino and LoRa shield</h3>
      <p>The Arduino needs a shield[A board that can be plugged on top of an Arduino and extend its capabilities] with LoRa[Long Range, a low-power wide-area network (LPWAN) protocol] capabilities in order to enable communication between alarm devices and the neighborhood server.</p>
      <p>Video LoRa shield + placement arduino</p>

      <ol>
        <li>Attach the antenna of the LoRa shield to the side of the shield.</li>
        <li>Move the yellow pin marked JP3 by lifting it away from the board and placing it back on only the innermost pin, as seen in the video below.</li>
        <li>Now place the shield on your Arduino, alligning all the connections closest to the end of the Arduino that has plugs.</li>
      </ol>
      

      
      <h3>Connect a breadboard</h3>
      <p>In order to connect components to the alarm device, you will need a breadboard[].</p>
      <p>breadboard graphic</p>
      <ol start="4">
        <li>Power the breadboard by connecting the 5V pin on the Arduino and the outer row labeled '+' on the breadboard with a male-to-male wire.</li>
        <li>On the same edge of the breadboard, use another wire to connect the GND of the Arduino to the outer row labeled '-'.</li>
      </ol>

      <h3>Panic button</h3>
      <p>A panic button will enable you to activate the alarm at any time.</p>
      <p>diagram</p>
      <ol start="6">
        <li>Add a push button to the middle area of the breadboard.</li>
        <li>On the breadboard, connect the column of one pin of the push button to the '+' row with a wire.</li>
        <li>On the other end of the push button, connect the column to wire to the A1 pin of the Arduino.</li>
        <li>On the same column, add a resistor the connects to a new column.</li>
        <li>The column containing the second wire of the resistor should be connected to the '-' row of the breadboard.</li>
      </ol>

      <h3>Display and keypad</h3>
      <p>Now you are ready to add the interface of the Control Panel: The keypad[] and the LCD[Liquid Crystal Display, a small screen]</p>
      <p>Video LoRa shield + placement arduino</p>
      <ol start="11">
        <li>Attach 8 male-to-male wires[wires that have an outward pin at both ends] to the keypad.</li>
        <li>Plug the </li>
        <li>adjust lcd</li>
        <li>Connect LCD to power</li>
        <li>Connect lcd to column</li>
        <li>Connect column to SCA/SDL</li>
      </ol>
      <p>Your Control Panel should now look like figure 2. Now you are ready to add a sensor.</p>
      <h3>Adding the LIDAR sensor</h3>
      The LIDAR sensor has a range of 60+ meters, but a laser-like narrow angle of detection.
      <p>Image</p>
      <ol start="17">
        <li>Connect SDA/SCL</li>
        <li>Connect power</li>
        <li>Connect gounds</li>
      </ol>
      <p>You are done!</p>
      <h2>Download and install software</h2>
      <p>IDE</p>
      <p>File download</p>
      <p>Library import</p>
      <p>Connect and configure Arduino</p>
      <p>Define TTN values in code.</p>
      <p>Flash code to arduino.</p>
      <p>Check serial monitor</p>
      <p>upload and run</p>


      <h2>Using the Control Panel</h2>
      <p>Power</p>
      <p>placement, secure sensor</p>
      <p>Startup takes a few moments as the sensor calibrates</p>
      <p>Arming</p>
      <p>Somewhere on the surface of the Arduino, there is a small button. When pressed, the Arduino and its software effectively restarts. If a device is restarted while the house is armed, the device will be unarmed for a few minutes before becoming armed.</p>
      <p>Panic</p>
      <p>panic + arm delay. If the device is restarted before the message is sent, it will not be transmitted.</p>
    </div>
  );
};

export default AlarmCPLidar;
