import React from "react";
import { Container, Row, Col } from "reactstrap";
import ServerSideNav from "./ServerSideNav";
import { Route, NavLink as RouterNavLink, Switch, Redirect } from "react-router-dom";
import ServerDevices from "./ServerDevices";
import ServerSetup from "./ServerSetup";
import ServerWelcome from "./ServerWelcome";

const ServerPage = props => {
  return (
    <>
      <Container className="themed-container clearfix" fluid={true}>
        <Row>
          <Col sm="2" style={{ padding: "1.5rem", paddingTop: "2rem", borderRight: "1px solid #0000001a" }}>
            <ServerSideNav></ServerSideNav>
          </Col>
          <hr />
          <Col sm="6" style={{ padding: "3rem" }}>
            <Switch>
              <Route exact path="/Server" component={ServerWelcome} />
              <Route exact path="/server/Devices" component={ServerDevices} />
              <Route exact path="/server/Setup" component={ServerSetup} />
              <Redirect to="/Server" />
            </Switch>
          </Col>
          <Col sm="2"></Col>
          <Col sm="2" style={{ padding: "1.5rem", paddingTop: "2rem", borderLeft: "1px solid #0000001a" }}>
            Perhaps Scrollspy
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ServerPage;
