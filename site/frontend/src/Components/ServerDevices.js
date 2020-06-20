import React from "react";
import { Button } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import ToolDescription from "./ToolDescription.js";
import { useTranslation } from "react-i18next";

const ServerDevices = props => {
  const { t } = useTranslation("server_v1");
  return (
    <div>
      <h1>
        Devices<span style={{ color: "grey", fontSize: "40%" }}>v1.0</span>
      </h1>
      <p>
        The items below represents all the necesarry hardware to get the system up and running. Before moving on to the
        setup section, make sure you have acquired all items!
      </p>
      <hr />
      <h4>TTN Gateway</h4>
      <p>
        To recieve the <ToolDescription id="lora" name="LoRaWAN" description="Low-power wide-area network protocol" />
        signals from the connected alarm systems within the neighborhood, you need a TTN gateway. This can be bought
        from{" "}
        <a
          href="https://uk.farnell.com/the-things-network/ttn-gw-868/the-things-gateway-eu/dp/2675813"
          target="_blank"
          rel="noopener noreferrer"
        >
          here.
        </a>
      </p>
      <h4>Raspberry Pi</h4>
      <p>
        You need a simple computer to act as a server that interacts with the information passing through The Things
        Network. NWA recommends Raspberry Pi 3 B+, as this is the device that the system was developed with, but newer
        versions should work as well. To power up the Raspberry Pi, you also need a Micro USB cable that can connect to
        a power outlet. The Raspberry Pi can be bought from{" "}
        <a
          href="https://let-elektronik.dk/shop/340-boards-raspberry-pi/14643-raspberry-pi-3-b/"
          target="_blank"
          rel="noopener noreferrer"
        >
          here.
        </a>
      </p>
      <h4>Micro SD Card</h4>
      <p>
        As the Raspberry Pi doesn't ship with memory, you need to acquire a compatible Micro SD card. It is a
        requirement that it has a minimum of 3gb available. You also need a computer that can read Micro SD cards
        directly or a dongle that enables this functionality. An appropiate memory card can be bought from{" "}
        <a
          href="https://let-elektronik.dk/shop/1000-hukommelse/15051-microsd-card---16gb-class-10/"
          target="_blank"
          rel="noopener noreferrer"
        >
          here.
        </a>
      </p>
      <h4>Huawei Modem + SIM card</h4>
      <p>
        For the SMS functionality to work, you need an activated SIM card with message sending capabilities. As SIM
        cards can't be directly inserted into a Raspberry Pi - or barely any computer for that matter - you need a
        wireless USB modem. NWA recommends the HUAWEI E3372H modem, as this is the device that the system was developed
        with. Note that different modems might require software alterrations. The HUAWEI modem can be bought from{" "}
        <a
          href="https://www.proshop.dk/Modem-Mobilt-WiFi/Huawei-E3372H-4G-White/2507308?utm_source=pricerunner&utm_medium=cpc&utm_campaign=pricesite"
          target="_blank"
          rel="noopener noreferrer"
        >
          here.
        </a>
      </p>
      <Button className="float-right" tag={RouterNavLink} to="/server/ttn" color="danger">
        Next: TTN Setup
      </Button>
    </div>
  );
};

export default ServerDevices;
