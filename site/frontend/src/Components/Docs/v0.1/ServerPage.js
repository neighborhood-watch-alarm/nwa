import React from "react";
import { Jumbotron, Button, Container, Row, Col } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ServerPage = props => {
  const { t } = useTranslation("server_v0");
  return (
    <>
      <Jumbotron style={{ backgroundColor: "white" }}>
        <h1 className="display-3">Server v0.5</h1>
        <p className="lead">Intro to old deprecated version</p>
        <hr className="my-2" />
        <p>Describtion of old deprecated version</p>
        <p className="lead">
          <Button tag={RouterNavLink} to="/Alarms/" outline color="danger">
            Download software
          </Button>
        </p>
      </Jumbotron>
    </>
  );
};

export default ServerPage;
