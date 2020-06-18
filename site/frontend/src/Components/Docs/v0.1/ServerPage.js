import React from "react";
import { Jumbotron, Button } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ServerPage = props => {
  const { t } = useTranslation("server_v0");
  return (
    <>
      <Jumbotron style={{ backgroundColor: "white" }}>
        <h1 className="display-3">{t("title")}</h1>
        <p className="lead">{t("intro")}</p>
        <hr className="my-2" />
        <p>{t("description")}</p>
        <p>{t("download")}</p>
        <p className="lead">
          <Button tag={RouterNavLink} to="/Alarms/" outline color="danger">
            {t("button")}
          </Button>
        </p>
      </Jumbotron>
    </>
  );
};

export default ServerPage;
