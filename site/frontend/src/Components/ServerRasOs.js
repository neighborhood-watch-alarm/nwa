import React from "react";
import { Button } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import ToolDescription from "./ToolDescription.js";
import { useTranslation } from "react-i18next";

const ServerRaspian = props => {
  const { t } = useTranslation("server_v1");
  return (
    <div>
      <h1>
        Raspberry Pi Setup<span style={{ color: "grey", fontSize: "40%" }}>v1.0</span>
      </h1>
      <p>
        This sections covers descriptions on how to prepare and install the necesarry system files to get Raspian up and
        running and how to interact with the Raspberry Pi. The process of setting up the WiFi modem and activating the
        SIM Card will also be explained.
      </p>
      <hr />
      <p>
        The first step in the process after acquiring the all necesarry hardware is to download{" "}
        <ToolDescription
          id="rasImager"
          name="Raspberry Pi Imager"
          description="Program that installs the Raspberry Pi operating system on an SD card"
        />{" "}
        Imager from{" "}
        <a href="https://www.raspberrypi.org/downloads/" target="_blank" rel="noopener noreferrer">
          https://www.raspberrypi.org/downloads/
        </a>
      </p>
      <p>
        You can check if the SMS capabilities work by directly running the bash script <code>...</code> with the
        command:
      </p>
      <p className="lead">
        <Button tag={RouterNavLink} to="/server/connection" color="danger">
          Next
        </Button>
      </p>
    </div>
  );
};

export default ServerRaspian;
