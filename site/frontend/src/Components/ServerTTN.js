import React from "react";
import { Button } from "reactstrap";
import { NavLink as RouterNavLink, Link } from "react-router-dom";
import ToolDescription from "./ToolDescription.js";
import ReactPlayer from "react-player";
import { useTranslation } from "react-i18next";

const ServerSetup = props => {
  const { t } = useTranslation("server_v1");
  return (
    <div>
      <h1>
        {t("ttn.title")}
        <span style={{ color: "grey", fontSize: "40%" }}>v1.0</span>
      </h1>
      <p>
        In this section it will be explained how to setup your Gateway properly, followed by instructions on how to
        configure the NWA application.
      </p>
      <hr />
      <h3>Gateway Setup</h3>
      <p>
        First you need to assemble your Gateway like explained in the manual. The process i straight forward, as you
        only need to connect the antenna by screwing it on at the front. After this is done, connect the device to a
        power outlet using the supplied cable.
      </p>
      <p>
        To activate the gateway head to{" "}
        <a href="https://activate.thethingsnetwork.org/" target="_blank" rel="noopener noreferrer">
          https://activate.thethingsnetwork.org/
        </a>
        . First you need to register an account if you don't have one already. After loggin in, press the button "Let's
        Get Started!". From here, you will be guided through the following four steps:
        <ol style={{ paddingTop: "10px" }}>
          <li>
            Choosing a uniquie ID for the gateway and a frequency plan (make sure to pick the area you're located in).
          </li>
          <li>
            Connect to the Gateway as a WiFi Router through your computer's internet settings. Use "thethings" to the
            promted password.
          </li>
          <li>
            Choose wether you want the Gateway to connect to the internet through WiFi or LAN, and set it up accordingly
            to your preference.
          </li>
          <li>
            Wait for the Gateway to succesfully connect. Once this is done, follow the link to the{" "}
            <ToolDescription
              id="console-app"
              name="Console Application Site"
              description="TTN Graphical User Interface app to monitor and manipulate exchange of data"
            />{" "}
            presented. In case of problems, use the LED lights on the Gateway to troubleshoot.
          </li>
        </ol>
      </p>
      <p>{t("ttn.videoIntro")}</p>
      <ReactPlayer controls="true" url="https://www.youtube.com/watch?v=cJNK4y1is2Q" />
      <p className="lead">
        <span style={{ color: "grey", fontSize: "60%" }}>{t("ttn.videoLicense")}</span>
      </p>
      <h3>Application Setup</h3>
      <p>
        After succesfully connecting the Gateway to TTN and following the link to{" "}
        <a href="https://console.thethingsnetwork.org/applications" target="_blank" rel="noopener noreferrer">
          https://console.thethingsnetwork.org/applications
        </a>
        , press "add application" to create the NWA app. Choose a new uniquie ID, a suitable description and an
        appropiate handler. If you live in Europe, we recommend the "ttn-handler-eu". After this is done, proceed to the
        application and scroll down to the bottom. Copy the acces key "default key" (should be the only one) in base64
        format and save it for later. You will need it when you prepare the{" "}
        <Link to="/server/connection" className="alert-link">
          software.
        </Link>
      </p>
      <h4>Adding devices</h4>
      <p>
        This step can be done now or later, but it needs to be done with every ordered device within the neighborhood.
        Before a device has been added to the application, the server will not be able to commuicate with it! This is
        therefore an ongoing process, where the person in charge of the server will continuously need to add devices as
        neighbors order more alarm components.
      </p>
      <p>
        To add a device press "register device" in the "Devices" tab. Proceed to yet aggain appoint a unique ID and
        select auto generation of EUI and App key. Then register the device.
      </p>
      <p>
        After adding a device click on it and head to the settings section. Change OTAA to ABP under ”Activation
        Method”, and select 16 instead of 32 bit under ”Frame Counter Width”. Now TTN should be ready to handle the
        information regarding this device. Make sure the device is set up as explained in the{" "}
        <Link to="/server/connection" className="alert-link">
          database guide.
        </Link>
      </p>
      <Button tag={RouterNavLink} to="/server/raspian" color="danger">
        Next
      </Button>
    </div>
  );
};

export default ServerSetup;
