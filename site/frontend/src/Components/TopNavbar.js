import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import "../App.css";
import { useTranslation } from "react-i18next";
import logo from "../Images/nwa-logo.png";

const TopNavbar = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { t, i18n } = useTranslation("general");

  function changeLan(lang) {
    i18n.changeLanguage(lang);
  }

  return (
    <div>
      <Navbar dark expand="md" className="fixed-top bg-danger text-white" style={{ fontWeight: "600" }}>
        <NavbarBrand tag={RouterNavLink} to="/">
          <img
            className="photo-logo"
            src={logo}
            alt="nwa system"
            style={{ display: "flex", width: "40px", height: "auto" }}
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/server">
                {t("navigation.server")}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/alarms" activeClassName="active">
                {t("navigation.alarm")}
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="mr-right" navbar>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/help" activeClassName="active">
                {t("navigation.help")}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/contribute" activeClassName="active">
                {t("navigation.contribute")}
              </NavLink>
            </NavItem>
            <UncontrolledDropdown setActiveFromChild>
              <DropdownToggle nav caret>
                {t("navigation.language")}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => changeLan("en")}>{t("navigation.en")}</DropdownItem>
                <DropdownItem onClick={() => changeLan("da")}>{t("navigation.da")}</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default TopNavbar;
