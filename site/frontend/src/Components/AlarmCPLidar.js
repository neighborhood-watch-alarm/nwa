import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane, Col, Row, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { useTranslation } from "react-i18next";

import ToolDescription from "./ToolDescription.js";
import classnames from 'classnames';
import lidarDiagram from "../Images/Fritzing/Images/ControlLIDAR.png";
import newFile from "../Images/arduino-new.png";
import libManager from "../Images/arduino-lib-man.png";
import ttnCode from "../Images/arduino-ttn-code.png";
import verify from "../Images/arduino-verify.png";
import serial from "../Images/arduino-serial.png";
import AlarmCPBasic from "./AlarmCPBasic.js";
import AlarmCPUse from "./AlarmCPUse.js";


const AlarmCPLidar = props => {
  const { t } = useTranslation("alarm_v1");

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleVersion = () => setDropdownOpen(prevState => !prevState);

  return (
    <div>
      <h1>{t("navigation.cp-lidar")}
        <ButtonDropdown isOpen={dropdownOpen} size="sm" toggle={toggleVersion} style={{paddingLeft: "10px", display: "inline-block"}}>
          <DropdownToggle outline caret>
            {t("guides.version")}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>1.0</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </h1>
      
      <p>{t("guides.cp-lidar-intro")}
      </p>
      <p>
        {t("guides.tooltip-explain0")}
        <ToolDescription id="tooltip-cplidar" name="grey" description="Hi, I'm a tooltip!"/>
        {t("guides.tooltip-explain1")}
      </p>
      
      <Nav tabs style={{marginBottom:"30px"}}>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            {t("guides.tab-hardware")}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            {t("guides.tab-software")}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            {t("guides.tab-use-cp")}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col>
              <img
                src={lidarDiagram}
                alt="LIDAR Control Panel hookup diagram"
                style={{ height: "auto", maxWidth: "100%" }}
              />
            </Col>
            <Col>
              <h3>{t("guides.parts-list")}</h3>
              <ul>
                <li>3 {t("guides.part.ttn")}</li>
                <li>1 {t("guides.part.mega")}</li>
                <li>1 {t("guides.part.lora")}</li>
                <li>1 {t("guides.part.keypad")}</li>
                <li>1 {t("guides.part.lcd")}</li>
                <li>1 {t("guides.part.breadboard")}</li>
                <li>1 {t("guides.part.button")}</li>
                <li>1 &gt;1kω {t("guides.part.resistor")}</li>
                <li>1 {t("guides.part.lidar")}</li>
                <li>7 {t("guides.part.m2m")}</li>
                <li>4 {t("guides.part.f2m")}</li>
                <li>{t("guides.part.power")}</li>
              </ul>
            </Col>
          </Row>
          <AlarmCPBasic/>
          <h3>{t("guides.lidar-title")}</h3>
          <p>{t("guides.lidar-intro")}</p>
          
          <img
            src={lidarDiagram}
            alt="LIDAR Control Panel hookup diagram"
            style={{ height: "auto", width: "100%", display: "block", marginLeft: "auto",
            marginRight: "auto", maxWidth: "700px" }}          />        
          
          <ul>
            <li>{t("guides.lidar-list0")}</li>
            <li>{t("guides.lidar-list1")}</li>
            <li>{t("guides.lidar-list2")}</li>
            <li>{t("guides.lidar-list3")}</li>
            <li>{t("guides.lidar-list4")}</li>
          </ul>
          <p>{t("guides.cp-hardware-outro")}</p>
          <Button className="float-right" color="danger" onClick={() => { toggle('2'); window.scrollTo(0, 0);}}>Next: Software Installation</Button>
        </TabPane>
        <TabPane tabId="2">        
          <h2>Download and install editing program</h2>
          <p>Your alarm device needs to have the device-specific NWA sotware installed in order to function in the alarm system.</p>
          <h3>You will need:</h3>
          <ul>
            <li>1 LIDAR Control Panel</li>
            <li>1 registered device on TTN, with three values provided by your local server administrator</li>
            <li>1 computer with a USB port</li>
            <li>1 USB A to B cable</li>
          </ul>
          <p>
            First, make sure you have the official {" "}
            <a href="https://www.arduino.cc/en/main/software" target="_blank" rel="noopener noreferrer">Arduino IDE</a>{" "}
            installed on your computer. If not, go to the official Arduino webpage and download the version suited to your computer. The
            <ToolDescription id="ide-cplidar" name="IDE" description="Integrated Development Environment, used to edit code"/>
            is used to adapt and upload the alarm device software to your Control Panel.
          </p>
          <p>When you open your installed Arduino program, a new file will open. The file has a .ino ending and is called a sketch file. If you have already used the Arduino IDE and need a fresh file, press the New button to open a new file.</p>
          
          <img
            src={newFile}
            alt="New button in Arduino IDE for creating new files"
            style={{ height: "auto", width: "100%", display: "block", marginLeft: "auto",
            marginRight: "auto", maxWidth: "400px", paddingBottom: "30px"}}
          />          
          <p>Replace the contents of the new file with the Control Panel software by copying and pasting the contents of the <a href="https://raw.githubusercontent.com/neighborhood-watch-alarm/nwa/master/alarm-system/alarm/control-panel/Alarm_control_panel_Lidar.ino" target="_blank" rel="noopener noreferrer">Control Panel - Lidar code</a>.</p>
          <p>Press the Save button, and give the file a name with the device number prepended and the alarm device type indicated, ie. "01_cp_lidar.ino".</p>
          
          <h3>Importing libraries</h3>
          <p>
            The code uses
            <ToolDescription id="lib-cplidar" name="libraries" description="In software, a library is a collection of files that can be referenced in code."/>
            to function as needed.
          </p>
          
          <h4>Installation of libraries supplied in the IDE</h4>
          <p>In the Arduino IDE, go to the Sketch tab and then to (Include Library &rarr; Manage Libraries).</p>
          
          <img
            src={libManager}
            alt="Navigation of arduino IDE tabs to find Library Manager: (Sketch &rarr; Include Library &rarr; Manage Libraries)"
            style={{ height: "auto", width: "100%", display: "block", marginLeft: "auto",
            marginRight: "auto", maxWidth: "700px", paddingBottom: "30px" }}
          /> 
          
          <p>This will open the Library Manager, where you must search for and install the following:</p>
          <ul>
            <li><b>Keypad</b> by <b>Mark Stanley, Alexander Bevig</b> Version <b>3.1.1</b></li>
            <li><b>LIDAR-Lite</b> by <b>Garmin</b> Version <b>3.0.2</b></li>
            <li><b>LiquidCrystal I2C</b> by <b>Frank de Brabander</b> Version <b>1.1.2</b></li>
          </ul>
          
          <h4>Installation of third party libraries from the web</h4>
          <p>
            Download the SipHash library (used to encrypt your PIN-code) from the {" "}
            <a href="http://www.forward.com.au/pfod/SipHashLibrary/" target="_blank" rel="noopener noreferrer">SipHash Library for Arduino webpage</a>{" "}
            under the Installation section. Note the location of the downloaded .ZIP file, and install it using the Arduino IDE under (Sketch &rarr; Include Library &rarr; Add .ZIP Library).
            </p>
          <p>
            Download the Arduino-LMIC library (used for LoRa communication) from the{" "}
            <a href="https://github.com/matthijskooijman/arduino-lmic" target="_blank" rel="noopener noreferrer">Arduino-LMIC GitHub page</a>{" "}
             by clicking (Clone or download &rarr; Download ZIP) on the page. Note the location of the downloaded .ZIP file, and install it using the Arduino IDE under (Sketch &rarr; Include Library &rarr; Add .ZIP Library).
          </p>
          
          <h3>Prepare and upload the software</h3>
          <p>When designing your system, each device was given a device number (eg. 1, 2, 3). The administrator of your neighborhood server should register your devices and supply a Network Session Key, App Session Key, and Device Address value for every device number. When you have these values, find the corresponding fields in the code (NWKSKEY, APPSKEY, and DEVADDR), and define the values: Note that the value of DEVADDR must have '0x' prepended. Press save.</p>
          
          <img
            src={ttnCode}
            alt="Code section with NWKSKEY, APPSKEY, and DEVADDR which must be specified"
            style={{ height: "auto", width: "100%", display: "block", marginLeft: "auto",
            marginRight: "auto", maxWidth: "1000px", paddingBottom: "30px" }}
          /> 
          
          <p>In the IDE, specify which model of Arduino you are using: (Tools &rarr; Board &rarr; Arduino Mega or Mega 2560).</p>
          <p>Press the Verify button. The console of the IDE should say 'Done compiling' with no warnings or errors, only information on use of program storage space and dynamic memory.</p>
          
          <img
            src={verify}
            alt="Verification console output example."
            style={{ height: "auto", width: "100%", display: "block", marginLeft: "auto",
            marginRight: "auto", maxWidth: "700px", paddingBottom: "30px" }}
          /> 
          
          <p>Plug your Control Panel into the computer by connecting a USB A to B cord from the Arduino to the computer. When the control panel is plugged in, a light should go off on the Arduino. In the IDE, got to (Tools &rarr; Port) and select the port that has an Arduino Mega or Mega 2560.</p>
          <p>With the Control panel plugged in, press the Upload button. Go to (Tools&rarr;Serial Monitor), this will open a text output from the connected Control Panel. The output should look something like the output on the image below.</p>
          
          <img
            src={serial}
            alt="Serial monitor output example."
            style={{ height: "auto", width: "100%", display: "block", marginLeft: "auto",
            marginRight: "auto", maxWidth: "400px", paddingBottom: "30px" }}
          />
          
          <p>Now your Control Panel is ready to use.</p>
          <Button className="float-right" color="danger" onClick={() => { toggle('3'); window.scrollTo(0, 0);}}>Next: Using the Control Panel</Button>
        </TabPane>
        <TabPane tabId="3">
          <AlarmCPUse/>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default AlarmCPLidar;
