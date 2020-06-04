import React from "react";
import { Jumbotron, Button } from "reactstrap";

const HomeJumbotron = props => {
  return (
    <div>
      <Jumbotron
        style={{
          backgroundColor: "white"
        }}
      >
        <h1 className="display-3">Welcome to NWA!</h1>
        <p className="lead">
          The first open source LoRa-based neighborhood security system!
        </p>
        <hr className="my-2" />
        <p>
          Neighborhood Watch Alarmsystem is divided into servers and alarms. The
          alarm components are built of an arduino with a LoRa shield, and the
          server is build using java and run from a raspberry pi. The
          communication between the alarm compontents and the server is
          facilitated by a TTN Gateway.
        </p>
        <p className="lead">
          <Button color="primary">Learn More</Button>
        </p>
      </Jumbotron>
    </div>
  );
};

export default HomeJumbotron;
