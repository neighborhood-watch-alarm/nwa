import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";

const ServerSideNav = props => {
  return (
    <div>
      <p>Hardware Setup</p>
      <Nav vertical>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/Server/Devices" className="text-muted">
            Devices
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/Server/Setup" activeClassName="active" className="text-muted">
            Setup
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/Server/OSFlashing" activeClassName="active" className="text-muted">
            OS Flashing
          </NavLink>
        </NavItem>
      </Nav>
      <hr />
      <p>Software installation</p>
      <Nav vertical>
        <NavItem>
          <NavLink tag={RouterNavLink} to="#" className="text-muted">
            TTN Connection
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterNavLink} to="#" className="text-muted">
            Database Setup
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterNavLink} to="#" className="text-muted">
            Hardware Integration
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default ServerSideNav;
