import React, { useState } from "react";
import { Tooltip, ListGroup, ListGroupItem } from "reactstrap";

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
      <p>You will need:</p>
      <ul>
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
      <h2>Building a basic Control Panel</h2>
      <h3>Mount LoRa shield on the Arduino</h3>
      <p>
        Get arduino, get lora shield
      </p>
      <p>
        video
      </p>
      <h3>Adding a panic button</h3>
      <p>Image</p>
      <h2>Adding the LIDAR sensor</h2>
      <p>Image</p>
      <h2>Download and install software</h2>
      <h2>Using the Control Panel</h2>

    </div>
  );
};

export default AlarmCPLidar;
