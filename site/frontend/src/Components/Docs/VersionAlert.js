import React from "react";
import { Alert } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";

const VersionAlert = props => {
  const { message, link } = props;
  return (
    <div>
      <Alert color="danger">
        {" "}
        This is a primary alert with{" "}
        <a href="/server" className="alert-link">
          an example link
        </a>
        . Give it a click if you like.
      </Alert>
    </div>
  );
};

export default VersionAlert;
