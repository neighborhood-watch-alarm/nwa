import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Route, Switch, Redirect } from "react-router-dom";
import ServerSideNav from "./ServerSideNav";
import ServerDevices from "./ServerDevices";
import ServerSetup from "./ServerSetup";
import ServerWelcome from "./ServerWelcome";
import EditText from "./EditText";
import { useTranslation } from "react-i18next";

const ServerPage = props => {
  const { t } = useTranslation(["general"]);
  return (
    <>
      <Container className="themed-container clearfix" fluid={true}>
        <Row>
          <Col sm="2" style={{ padding: "1.5rem", paddingTop: "2rem", borderRight: "1px solid #0000001a" }}>
            <ServerSideNav></ServerSideNav>
          </Col>
          <hr />
          <Col sm="7" style={{ padding: "3rem", borderTop: "1px solid #0000001a" }}>
            <Switch>
              <Route exact path="/server" component={ServerWelcome} />
              <Route exact path="/server/devices" component={ServerDevices} />
              <Route exact path="/server/setup" component={ServerSetup} />
              <Redirect to="/server" />
            </Switch>
          </Col>
          <Col sm="1"></Col>
          <Col
            sm="2"
            style={{
              padding: "1.5rem",
              paddingTop: "2rem",
              borderLeft: "1px solid #0000001a",
              borderTop: "1px solid #0000001a"
            }}
          >
            <p>{t("general:improve.intro")}</p>
            <EditText
              buttonLabel={t("general:improve.button")}
              link="https://github.com/simoneengelbr/nwa"
              fileName="server_v1.json"
            ></EditText>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ServerPage;
