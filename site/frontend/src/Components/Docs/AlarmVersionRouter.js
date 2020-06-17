import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Route, Switch, Redirect } from "react-router-dom";
import VersionAlert from "./VersionAlert.js";

const AlarmPage = props => {
  return (
    <>
      <Container className="themed-container clearfix" fluid={true} style={{ padding: "1rem" }}>
        <VersionAlert message="This material covers an older deprecated version of NWA. For the latest version, click here."></VersionAlert>
        <Switch>
          <Redirect to="/alarm" />
        </Switch>
      </Container>
    </>
  );
};

export default AlarmPage;
