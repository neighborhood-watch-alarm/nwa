import React from "react";
import { Container } from "reactstrap";
import { Route, Switch, Redirect } from "react-router-dom";
import ServerV0 from "./v0.1/ServerPage.js";
import VersionAlert from "./VersionAlert.js";

const ServerPage = props => {
  return (
    <>
      <Container className="themed-container clearfix" fluid={true} style={{ padding: "1rem" }}>
        <VersionAlert link="/server"></VersionAlert>
        <Switch>
          <Route exact path="/docs/server/v0.1" component={ServerV0} />
          <Redirect to="/server" />
        </Switch>
      </Container>
    </>
  );
};

export default ServerPage;
