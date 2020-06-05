import React from "react";
import { Jumbotron, Button, Container, Row, Col } from "reactstrap";
import { Link, NavLink as RouterNavLink } from "react-router-dom";
import logo from "../Images/nwa_logo.png";

const HomePage = props => {
  return (
    <Container>
      <Row>
        <Col sm="8">
          <Jumbotron style={{ backgroundColor: "white" }}>
            <h1 className="display-3">Welcome to NWA!</h1>
            <p className="lead">The first open source LoRa-based neighborhood security system!</p>
            <hr className="my-2" />
            <p>
              Neighborhood Watch Alarmsystem is divided into servers and alarms. The alarm components are built of an
              arduino with a LoRa shield, and the server is build using java and run from a raspberry pi. The
              communication between the alarm compontents and the server is facilitated by a TTN Gateway.
            </p>
            <p className="lead">
              <Button tag={RouterNavLink} to="/Server/" color="danger">
                Setup a server
              </Button>{" "}
              <Button tag={RouterNavLink} to="/Alarms/" outline color="danger">
                Configure alarms
              </Button>
            </p>
          </Jumbotron>
        </Col>
        <Col sm="4">
          <img className="photo-logo" src={logo} style={{ paddingTop: "50px", height: "400px" }} />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
