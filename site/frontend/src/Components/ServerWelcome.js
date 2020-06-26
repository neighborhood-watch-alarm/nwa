import React, { useState } from "react";
import { Button } from "reactstrap";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Label } from "reactstrap";
import { NavLink as RouterNavLink, Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import systemPreview from "../Images/alarmsystem-basics.png";
import ToolDescription from "./ToolDescription.js";

const ServerWelcome = props => {
  const { t } = useTranslation("server_v1");

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleVersion = () => setDropdownOpen(prevState => !prevState);

  return (
    <div>
      <h1>{t("intro.title")}</h1>
      <Dropdown isOpen={dropdownOpen} toggle={toggleVersion}>
        <Label for="backdrop">{t("intro.version")}</Label>
        <DropdownToggle caret color="link">
          v1.0
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem disabled>v1.0 ({t("intro.latest")})</DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={RouterNavLink} to="/docs/server/v0.1">
            v0.1
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <hr />
      <p>
        <Trans i18nKey="server_v1:intro.devices">
          The server consist of a
          <ToolDescription id="rasp" name="Raspberry Pi" description={t("intro.tooltips.raspPi")} />
          and a
          <ToolDescription id="ttn" name="TTN Gateway" description={t("intro.tooltips.ttn")}>
            TTN Gateway
          </ToolDescription>
          . The gateway handles the communication back and forward with all the connected devices (
          <Link to="/alarms" className="alert-link">
            visit the alarms section for more info
          </Link>
          ), and the server interprets this passed information. In case of a break in or if a device malfunctions, the
          server notifices either the entire neighborhood or specific individuals by SMS - depending on the issue.
        </Trans>
      </p>
      <p>{t("intro.diagram")}</p>
      <img
        className="photo-logo"
        src={systemPreview}
        alt="nwa system overview"
        style={{ paddingBottom: "20px", height: "auto", maxWidth: "100%" }}
      />
      <p>{t("intro.server.description")}</p>
      <p className="lead">
        <Button tag={RouterNavLink} to="/server/devices/" color="danger">
          {t("intro.server.link")}
        </Button>
      </p>
      <p>{t("intro.hardware.description")}</p>
      <p className="lead">
        <Button tag={RouterNavLink} to="/server/ttn-connection/" outline color="danger">
          {t("intro.hardware.link")}
        </Button>
      </p>
    </div>
  );
};

export default ServerWelcome;
