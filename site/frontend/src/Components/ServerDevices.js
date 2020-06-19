import React, { useState } from "react";
import { Tooltip } from "reactstrap";
import ReactPlayer from "react-player";

const ServerDevices = props => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div>
      <p>
        Somewhere in here is a device{" "}
        <span style={{ textDecoration: "", color: "blue" }} href="#" id="TooltipExample">
          tooltip
        </span>
        .
      </p>
      <Tooltip placement="right" isOpen={tooltipOpen} target="TooltipExample" toggle={toggle}>
        Hello, I'm a Tooltip!
      </Tooltip>
      <ReactPlayer controls="true" url="https://www.youtube.com/watch?v=9bZkp7q19f0" />
    </div>
  );
};

export default ServerDevices;
