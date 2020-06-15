import React, { useState } from "react";
import { Button } from "reactstrap";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Label } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ServerWelcome = props => {
  const { t } = useTranslation("server_v1");

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <div>
      <h1 className="display-5">{t("intro.title")}</h1>
      <p>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
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
      </p>
      <hr />
      <p>{t("intro.server.description")}</p>
      <p className="lead">
        <Button tag={RouterNavLink} to="/Server/Devices/" color="danger">
          {t("intro.server.link")}
        </Button>
      </p>
      <p>{t("intro.hardware.description")}</p>
      <p className="lead">
        <Button tag={RouterNavLink} to="/Server/TTNConnection/" outline color="danger">
          {t("intro.hardware.link")}
        </Button>
      </p>
    </div>
  );
};

export default ServerWelcome;
