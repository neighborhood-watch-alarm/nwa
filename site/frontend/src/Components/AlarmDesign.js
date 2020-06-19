import React, { useState } from "react";
import { Tooltip, Table } from "reactstrap";
import exampleImage from "../Images/alarmDesign-example.png";
import { Link } from "react-router-dom";
import DeviceForm from "./DeviceForm";

const AlarmDesign = props => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div>
      <h1>
        Design<span style={{ color: "grey", fontSize: "40%" }}>v1.0</span>
      </h1>
      <p>
        There are two types of alarm devices: Control Panels and Sensor Nodes. Both types of devices are outfitted with
        a sensor and can set off the alarm. Control Panels also have a screen and keypad that you can use to arm and
        disarm the house. Additionally, Control Panels have a panic button that you can use to set off the alarm
        regardless of whether the house is armed or not.
      </p>
      <p>A Sensor Node or Control Panel uses one of three sensors: LIDAR, PIR or Ultrasonic.</p>

      <Table bordered striped>
        <thead>
          <tr>
            <th>Sensor type</th>
            <th>Model</th>
            <th>Range</th>
            <th>Detection angle</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>LIDAR</td>
            <td>LIDAR-Lite v3</td>
            <td>1-40m</td>
            <td>Singular</td>
            <td>$$$</td>
          </tr>
          <tr>
            <td>PIR</td>
            <td>HC-SR505</td>
            <td>0-3m</td>
            <td>Cone angle, less than 100 degrees</td>
            <td>$</td>
          </tr>
          <tr>
            <td>Ultrasonic</td>
            <td>LV-MaxSonar-EZ0</td>
            <td>0.15-6.45m</td>
            <td>62 degrees</td>
            <td>$$</td>
          </tr>
        </tbody>
      </Table>
      <p>
        You can decide which alarm devices you want to build based on your security needs. When designing your solution,
        you should include at least one Control Panel to arm the system.
      </p>
      <p>
        Below is an example of an alarm installation using LIDAR, PIR, and ultrasonic sensors indicating the range and
        width of the detection zones for the different sensors.
      </p>
      <p>
        <img
          className="photo-logo"
          src={exampleImage}
          alt="nwa system"
          style={{ paddingRight: "50px", height: "auto", maxWidth: "100%" }}
        />
      </p>
      <p>
        If you would like to build one or more alarms for your own home, you can compile a list of all the parts needed
        for your alarm setup below. You can choose to give a device a descriptive name, like "Living room" in order to
        keep track of your alarms during installation and maintenance.
      </p>
      <p>
        Somewhere in here is a device{" "}
        <span style={{ textDecoration: "", color: "grey" }} href="#" id="TooltipArm">
          arm
        </span>
        .
      </p>
      <Tooltip placement="right" isOpen={tooltipOpen} target="TooltipArm" toggle={toggle}>
        When a house is armed, the alarm will be set off when an alarm device in the house senses movement.
      </Tooltip>

      <DeviceForm></DeviceForm>

      <p>
        A Neighborhood Watch Alarm System Server set up in your Neighborhood is necessary for your alarms to
        function. If there isn't yet a server in your area, please consider building one by visiting{" "}
        <Link to="/server" className="alert-link">
          the server page
        </Link>
        . Before installation, contact the administrator of your local server and ensure that your house, devices, and phone number are registered. When registering, you need to supply a PIN-code that you will use to arm and disarm your house. Your server administrator will have access to this PIN-code, so please be sure to create a new PIN-code that you do not use for other security-related purposes.
      </p>
    </div>
  );
};

export default AlarmDesign;
