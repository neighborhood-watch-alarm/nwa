import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Route, Switch, Redirect } from "react-router-dom";
import AlarmSideNav from "./AlarmSideNav";
import AlarmWelcome from "./AlarmWelcome";
import AlarmDesign from "./AlarmDesign";
import AlarmCPLidar from "./AlarmCPLidar";
import AlarmCPPir from "./AlarmCPPir";
import AlarmCPUltra from "./AlarmCPUltra";
import AlarmSNLidar from "./AlarmSNLidar";
import AlarmSNPir from "./AlarmSNPir";
import AlarmSNUltra from "./AlarmSNUltra";
import EditText from "./EditText";
import { useTranslation } from "react-i18next";

const AlarmPage = props => {
  const { t } = useTranslation(["general"]);
  return (
    <>
      <Container className="themed-container clearfix" fluid={true}>
        <Row>
          <Col sm="2" style={{ padding: "1.5rem", paddingTop: "2rem", borderRight: "1px solid #0000001a" }}>
            <AlarmSideNav></AlarmSideNav>
          </Col>
          <hr />
          <Col sm="7" style={{ padding: "3rem", borderTop: "1px solid #0000001a" }}>
            <Switch>
              <Route exact path="/alarms" component={AlarmWelcome} />
              <Route exact path="/alarms/design" component={AlarmDesign} />
              <Route exact path="/alarms/cp-lidar" component={AlarmCPLidar} />
              <Route exact path="/alarms/cp-pir" component={AlarmCPPir} />
              <Route exact path="/alarms/cp-ultrasonic" component={AlarmCPUltra} />
              <Route exact path="/alarms/sn-lidar" component={AlarmSNLidar} />
              <Route exact path="/alarms/sn-pir" component={AlarmSNPir} />
              <Route exact path="/alarms/sn-ultrasonic" component={AlarmSNUltra} />
              <Redirect to="/alarms" />
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
              link={t("improve.popup.linkToAlarm")}
              fileName="alarm_v1.json"
            ></EditText>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AlarmPage;
