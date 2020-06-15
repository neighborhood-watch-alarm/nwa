import React from "react";
import { Jumbotron, Button, Container, Row, Col } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import logo from "../Images/nwa_logo.png";
import { useTranslation } from "react-i18next";

const HomePage = props => {
  const { t } = useTranslation("home");
  return (
    <Container>
      <Row>
        <Col sm="8">
          <Jumbotron style={{ backgroundColor: "white" }}>
            <h1 className="display-3">{t("title")}</h1>
            <p className="lead">{t("subtitle")}</p>
            <hr className="my-2" />
            <p>{t("description")}</p>
            <p className="lead">
              <Button tag={RouterNavLink} to="/Server/" color="danger">
                {t("button.server")}
              </Button>{" "}
              <Button tag={RouterNavLink} to="/Alarms/" outline color="danger">
                {t("button.alarm")}
              </Button>
            </p>
          </Jumbotron>
        </Col>
        <Col sm="4">
          <img className="photo-logo" src={logo} alt="nwa system" style={{ paddingTop: "50px", height: "400px" }} />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
