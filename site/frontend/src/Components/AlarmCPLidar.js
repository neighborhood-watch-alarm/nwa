import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane, Col, Row, Button } from "reactstrap";
import { Link } from "react-router-dom";

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
      
      <Nav tabs>
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
            First, download and install the {" "}
            <Link to="/server" className="alert-link">
              Arduino IDE
            </Link>{" "}
            supplied on the official Arduino webpage to your computer.
          </p>

          <h3>Importing libraries</h3>
          <p>siphash</p>
          <p>lmic</p>
          <p>lmic</p>
          <h3>Installing the Contol Panel code</h3>
          <p>File download</p>
          <p>Define TTN values in code.</p>
          <p>Connect and configure Arduino</p>
          <p>Flash code to arduino.</p>
          <p>Check serial monitor</p>
          <p>Now your Control Panel is ready to use.</p>
          <Button className="float-right" color="danger" onClick={() => { toggle('3'); }}>Next: Using the Control Panel</Button>
        </TabPane>
        <TabPane tabId="3">
          <h2>Using the Control Panel</h2>
          <p>Power</p>
          <p>placement, secure sensor</p>
          <p>Startup takes a few moments as the sensor calibrates</p>
          <p>Arming</p>
          <p>Somewhere on the surface of the Arduino, there is a small button. When pressed, the Arduino and its software effectively restarts. If a device is restarted while the house is armed, the device will be unarmed for a few minutes before becoming armed.</p>
          <p>Panic</p>
          <p>panic + arm delay. If the device is restarted before the message is sent, it will not be transmitted.</p>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default AlarmCPLidar;
