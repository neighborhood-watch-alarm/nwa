import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AlarmSideNav = props => {
  const { t } = useTranslation("alarm_v1");

  return (
    <div>
      <p>{t("navigation.design-h")}</p>
      <Nav vertical>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/alarms/design" className="text-muted">
            {t("navigation.design")}
          </NavLink>
        </NavItem>
      </Nav>
      <hr />
      <p>{t("navigation.guide-h")}</p>
      <Nav vertical>
      <NavItem>
          <NavLink tag={RouterNavLink} to="/alarms/cp-lidar" activeClassName="active" className="text-muted">
            {t("navigation.cp-lidar")}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/alarms/cp-pir" activeClassName="active" className="text-muted">
            {t("navigation.cp-pir")}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/alarms/cp-ultrasonic" activeClassName="active" className="text-muted">
            {t("navigation.cp-us")}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/alarms/sn-lidar" activeClassName="active" className="text-muted">
            {t("navigation.sn-lidar")}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/alarms/sn-pir" activeClassName="active" className="text-muted">
            {t("navigation.sn-pir")}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/alarms/sn-ultrasonic" activeClassName="active" className="text-muted">
            {t("navigation.sn-us")}
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default AlarmSideNav;
