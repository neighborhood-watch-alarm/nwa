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
  DropdownItem,
  NavbarText
} from "reactstrap";

const TopNavbar = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">NWA</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/Server/">Server</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Alarms/">Alarms</NavLink>
            </NavItem>
          </Nav>
          <Nav className="mr-right" navbar>
            <NavItem>
              <NavLink href="/Help/">Help</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Contribute/">Contribute</NavLink>
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
