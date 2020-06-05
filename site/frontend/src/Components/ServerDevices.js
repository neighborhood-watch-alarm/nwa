import React, { useState } from "react";
import { Tooltip } from "reactstrap";

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
    </div>
  );
};

export default ServerDevices;
