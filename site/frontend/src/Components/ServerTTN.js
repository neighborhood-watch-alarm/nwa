import React from "react";
import { Button } from "reactstrap";
import { NavLink as RouterNavLink, Link } from "react-router-dom";
import ToolDescription from "./ToolDescription.js";
import ReactPlayer from "react-player";
import { useTranslation, Trans } from "react-i18next";

const ServerSetup = props => {
  const { t } = useTranslation("server_v1");
  return (
    <div>
      <h1>
        {t("ttn.title")}
        <span style={{ color: "grey", fontSize: "40%" }}>v1.0</span>
      </h1>
      <p>{t("ttn.intro")}</p>
      <hr />
      <h3>{t("ttn.gateway.title")}</h3>
      <p>{t("ttn.gateway.intro")}</p>
      <p>
        <Trans i18nKey="server_v1:ttn.gateway.activate">
          To activate the gateway head to
          <a href="https://activate.thethingsnetwork.org/" target="_blank" rel="noopener noreferrer">
            https://activate.thethingsnetwork.org/
          </a>
          . You need to register an account if you don't have one already. When logged in, press the button "Let's Get
          Started!". From here, you will be guided through the following four steps:
        </Trans>
      </p>
      <ol>
        <li>{t("ttn.gateway.1")}</li>
        <li>{t("ttn.gateway.2")}</li>
        <li>{t("ttn.gateway.3")}</li>
        <li>
          <Trans i18nKey="server_v1:ttn.gateway.4">
            Wait for the Gateway to succesfully connect. Once this is done, follow the link to the
            <ToolDescription id="console-app" name="Console Application Site" description={t("ttn.gateway.tooltip4")} />
            /> presented. In case of problems, use the LED lights on the Gateway to troubleshoot.
          </Trans>
        </li>
      </ol>
      <p>{t("ttn.gateway.videoIntro")}</p>
      <ReactPlayer controls="true" url="https://www.youtube.com/watch?v=cJNK4y1is2Q" />
      <p className="lead">
        <span style={{ color: "grey", fontSize: "60%" }}>{t("ttn.gateway.videoLicense")}</span>
      </p>
      <h3>{t("ttn.app.title")}</h3>
      <p>
        <Trans i18nKey="server_v1:ttn.app.intro">
          After succesfully connecting the Gateway to TTN and following the link to
          <a href="https://console.thethingsnetwork.org/applications" target="_blank" rel="noopener noreferrer">
            https://console.thethingsnetwork.org/applications
          </a>
          , press "add application" to create the NWA app. Choose a new uniquie ID, a suitable description and an
          appropiate handler. If you live in Europe, we recommend the "ttn-handler-eu". After this is done, proceed to
          the application and scroll down to the bottom. Copy the acces key "default key" (should be the only one) in
          base64 format and save it for later. You will need it when you prepare the
          <Link to="/server/connection" className="alert-link">
            software.
          </Link>
        </Trans>
      </p>
      <h4>{t("ttn.app.devices.title")}</h4>
      <p>{t("ttn.app.devices.intro")}</p>
      <p>{t("ttn.app.devices.add")}</p>
      <p>
        <Trans i18nKey="server_v1:ttn.app.devices.method">
          After adding a device click on it and head to the settings section. Change OTAA to ABP under ”Activation
          Method”, and select 16 instead of 32 bit under ”Frame Counter Width”. Now TTN should be ready to handle the
          information regarding this device. Make sure the device is set up as explained in the
          <Link to="/server/connection" className="alert-link">
            database guide.
          </Link>
        </Trans>
      </p>
      <Button className="float-right" tag={RouterNavLink} to="/server/os" color="danger">
        Next: Raspberry Pi Setup
      </Button>
    </div>
  );
};

export default ServerSetup;
