import React, { useState } from "react";
import { Tooltip } from "reactstrap";

const ToolDescription = props => {
  const { name, description, id } = props;

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <>
      {" "}
      <span style={{ textDecoration: "", color: "grey" }} href="#" id={id}>
        {name}
      </span>{" "}
      <Tooltip placement="right" isOpen={tooltipOpen} target={id} toggle={toggle}>
        {description}
      </Tooltip>
    </>
  );
};

export default ToolDescription;
