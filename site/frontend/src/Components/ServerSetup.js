import React, { useState } from "react";
import { Tooltip } from "reactstrap";

const ServerSetup = props => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div>
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
    </div>
  );
};

export default ServerSetup;
