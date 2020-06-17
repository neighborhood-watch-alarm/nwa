import React from "react";
import { Container } from "reactstrap";
import { Switch, Redirect } from "react-router-dom";
import VersionAlert from "./VersionAlert.js";

const AlarmPage = props => {
  return (
    <>
      <Container className="themed-container clearfix" fluid={true} style={{ padding: "1rem" }}>
        <VersionAlert link="/alarm"></VersionAlert>
        <Switch>
          <Redirect to="/alarm" />
        </Switch>
      </Container>
    </>
  );
};

export default AlarmPage;
