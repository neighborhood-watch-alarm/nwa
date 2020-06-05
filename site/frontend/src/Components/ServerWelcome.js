import React from "react";
import { Button } from "reactstrap";
import { Link, NavLink as RouterNavLink } from "react-router-dom";

const ServerWelcome = props => {
  return (
    <div>
      <h2 className="display-5">Server Setup</h2>
      <hr />
      <p>
        To setup your own running server you must first acquire and set up the neccesarry hardware. Follow the button
        below for instructions regarding this hardware and their usage.
      </p>
      <p className="lead">
        <Button tag={RouterNavLink} to="/Server/Devices/" color="danger">
          Harware Setup
        </Button>
      </p>
      <p>
        If you have already set up the hardware properply, you're ready to install the neccessary software. Follow the
        button below for instructions on how to setup this software.
      </p>
      <p className="lead">
        <Button tag={RouterNavLink} to="/Server/TTNConnection/" outline color="danger">
          Software Setup
        </Button>
      </p>
    </div>
  );
};

export default ServerWelcome;
