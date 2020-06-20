import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane, Col, Row, Button } from "reactstrap";

import ToolDescription from "./ToolDescription.js";
import classnames from 'classnames';
import lidarDiagram from "../Images/Fritzing/Images/ControlLIDAR.png";
import AlarmCPBasic from "./AlarmCPBasic.js";


const AlarmCPLidar = props => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div>
      <h1>Control Panel - LIDAR</h1>
      <p>
        The LIDAR Control Panel is an alarm device capable of arming and disarming a house, sending a panic notification and sensing movement in a range of 40 meters.
      </p>
      <p>
        Expressions shown in
        <ToolDescription id="tooltip-cplidar" name="grey" description="Hi, I'm a tooltip!"/>
        will display information when you hover your mouse over them.
      </p>
      
      <Nav tabs style={{marginBottom:"30px"}}>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Hardware Setup
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Software Installation
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            Using the Control Panel
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
              <h3>You will need:</h3>
              <ul>
                <li>3 TTN Device values provided by your local server administrator</li>
                <li>1 Arduino Mega 2560</li>
                <li>1 Dragino LoRa shield for Arduino</li>
                <li>1 4x4 Keypad</li>
                <li>1 16x2 LCD with I2C interface</li>
                <li>1 breadboard</li>
                <li>1 push button</li>
                <li>1 &gt;1kω resistor</li>
                <li>1 LIDAR-Lite v3 with cables</li>
                <li>7 jumper or male-to-male wires</li>
                <li>4 -to-male wires</li>
                <li>1 9V power supply OR 1 USB A to B cable and 1 5V wall mount USB adaptor</li>
              </ul>
            </Col>
          </Row>
          <AlarmCPBasic/>
          <h3>5. Adding the LIDAR sensor</h3>
          <p>The LIDAR sensor has a long range and a laser-like narrow angle of detection. The LIDAR has more wire connections than needed for this device, so the excess wires are connected to ground. </p>
          
          <img
            src={lidarDiagram}
            alt="LIDAR Control Panel hookup diagram"
            style={{ height: "auto", width: "100%", display: "block", marginLeft: "auto",
            marginRight: "auto", maxWidth: "700px" }}          />        
          
          <ul>
            <li>Connect the included wires to the LIDAR.</li>
            <li>The black wire should connect o the ground row on the breadboard.</li>
            <li>Connect the blue wire to the SDA column of the breadbpard, and the green wire to SCL.</li>
            <li>The yellow and orange wires should be connected to ground like the black wire.</li>
            <li>Connect he red wire to the power row on the breadboard.</li>
          </ul>
          <p>You have now built an alarm device! Time to install the Control Panel software.</p>
          <Button className="float-right" color="danger" onClick={() => { toggle('2'); }}>Next: Software Installation</Button>
        </TabPane>
        <TabPane tabId="2">        
          <h2>Download and Install Software</h2>
          <p>Your alarm device needs to have the device-specific NWA sotware installed in order to function in the alarm system.</p>
          <h3>You will need:</h3>
          <ul>
            <li>1 LIDAR Control Panel</li>
            <li>1 registered device on TTN, with three values provided by your local server administrator</li>
            <li>1 computer with a USB port</li>
            <li>1 USB A to B cable</li>
          </ul>
          <p>
            First, go to the official Arduino webpage and download and install the {" "}
            <a href="https://www.arduino.cc/en/main/software" target="_blank" rel="noopener noreferrer">Arduino IDE</a>{" "}
            on to your computer. The
            <ToolDescription id="ide-cplidar" name="IDE" description="Integrated Development Environment, used to edit code"/>
            is needed to edit and upload the software to the Control Panel.
          </p>

          <h3>Importing libraries</h3>
          <p>
            The code uses
            <ToolDescription id="lib-cplidar" name="libraries" description="In software, a library is a collection of files that can be referenced in code."/>
            to function as needed.
          </p>
          <p>Installer direkte:lcd, keypad, og lidar</p>
          <p>Download og importer: siphash, lmic</p>
          
          <h3>Installing the Control Panel code</h3>
          <p>File download{" "}
           <a href="https://www.arduino.cc/en/main/software" target="_blank" rel="noopener noreferrer">Arduino IDE</a>{" "}
          </p>
          <p>Define TTN values in code.</p>
          <p>Connect and configure Arduino</p>
          <p>Flash code to arduino.</p>
          <p>Check serial monitor</p>
          <p>Now your Control Panel is ready to use.</p>
          <Button className="float-right" color="danger" onClick={() => { toggle('3'); }}>Next: Using the Control Panel</Button>
        </TabPane>
        <TabPane tabId="3">
          <h2>Using the Control Panel</h2>
          <p>The Control Panel is powered by plugging it into a 9V power supply. Alternately, the USB A to B cable used for intallation along with a 5V wall mount USB adaptor can also power the device.</p>
          <p>When placing the alarm device in your home, try to place it in a discreet position, and if possible, secure the sensor. When the device is moved, you run the risk of connections falling out. An ideal placement would be out of the way of daily movement, stored inside a box or casing with a cutout for the sensor. This would also help protect the device from dust.</p>
          <p>When starting up the device, the sensors recalibrate. This takes a few moments.</p>
          <p>Somewhere on the surface of the Arduino, there is a small button. When pressed, the Arduino and its software restarts. If a device is restarted while the house is armed, the device will be unarmed for a few minutes before becoming armed.</p>
          <p>In order to arm or disarm the system, type your PIN-code on the keypad followed by #. The LCD should indicate how many numbers you have typed. If you want to clear what you've typed, press *. When the pin code is sent, the screen will display a "Waiting for ack" message to indicate that it is expecting a response from the server. This may take several minutes, and your house is not armed before the response from the server arrives. Any other active alarm devices in your home will become armed within a few more minutes.</p>
          <p>Regardless of whether your house is armed, you can press the panic button to set off the alarm and notify your neighbors of a potential danger.</p>
          <p>Please note that your alarm device communicates with the server at a regular interval of a few minutes. This includes information on the panic and arming status of your home. If you have pressed the panic button or entered your PIN-code, you may have up to a few minutes before information is transmitted to the server. If your alarm is restarted within this time period, no information will be transmitted.</p>
          <p>If an alarm device stops communicating to the server, the server will sound the alarm. If your house is armed, your neighbors will be notified of the alarm. If not, only you will receive a text notofication on the status of your device.</p>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default AlarmCPLidar;
