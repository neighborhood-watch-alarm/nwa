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
            <h1 className="display-3" style={{paddingTop:"60px"}}>{t("title")}</h1>
            <p className="lead">{t("subtitle")}</p>
            <p>{t("description")}</p>
        </Col>
        <Col sm="4">
          <img className="photo-logo" src={logo} alt="nwa system" style={{ paddingTop: "50px", height: "400px" }} />
        </Col>
      </Row>
          <Jumbotron fluid style={{ backgroundColor: "white", paddingTop:"20px"}}>
            <hr className="my-2" />
            <p>{t("alarm-system")}</p>
            <p>{t("lora")}</p>
            <p>{t("tech")}</p>
            <p>{t("server")}</p>
            <Button block tag={RouterNavLink} to="/Server/" color="danger" style={{marginBottom:"20px"}}>
              {t("button.server")}
            </Button>{" "}
            <p>{t("alarm")}</p>
            <Button block tag={RouterNavLink} to="/alarms/" outline color="danger">
              {t("button.alarm")}
            </Button>
          </Jumbotron>      
    </Container>
  );
};

export default HomePage;
