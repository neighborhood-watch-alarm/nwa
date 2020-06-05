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

const TopNavbar = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar dark expand="md" className="fixed-top bg-danger text-white" style={{ fontWeight: "600" }}>
        <NavbarBrand tag={RouterNavLink} to="/">
          NWA
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/Server/">
                Server
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/Alarms/" activeClassName="active">
                Alarms
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="mr-right" navbar>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/Help/" activeClassName="active">
                Help
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/Contribute/" activeClassName="active">
                Contribute
              </NavLink>
            </NavItem>
            <UncontrolledDropdown setActiveFromChild>
              <DropdownToggle nav caret>
                Language
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>English</DropdownItem>
                <DropdownItem>Danish</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default TopNavbar;
