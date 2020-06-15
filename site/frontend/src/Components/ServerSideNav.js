import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ServerSideNav = props => {
  const { t } = useTranslation("server_v1");
  return (
    <div>
      <p>{t("navigation.hardware")}</p>
      <Nav vertical>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/Server/Devices" className="text-muted">
            {t("navigation.devices")}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/Server/Setup" activeClassName="active" className="text-muted">
            {t("navigation.setup")}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/Server/OSFlashing" activeClassName="active" className="text-muted">
            {t("navigation.os")}
          </NavLink>
        </NavItem>
      </Nav>
      <hr />
      <p>{t("navigation.software")}</p>
      <Nav vertical>
        <NavItem>
          <NavLink tag={RouterNavLink} to="#" className="text-muted">
            {t("navigation.ttn")}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterNavLink} to="#" className="text-muted">
            {t("navigation.database")}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterNavLink} to="#" className="text-muted">
            {t("navigation.integration")}
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default ServerSideNav;
