import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

const ServerSideNav = props => {
  return (
    <div>
      <p>Hardware Setup</p>
      <Nav vertical>
        <NavItem>
          <NavLink href="#">Devices</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Setup</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">OS Flashing</NavLink>
        </NavItem>
      </Nav>
      <hr />
      <p>Software installation</p>
      <Nav vertical>
        <NavItem>
          <NavLink href="#">TTN Connection</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Database Setup</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Hardware Integration</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default ServerSideNav;
