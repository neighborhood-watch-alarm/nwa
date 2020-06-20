import React from "react";
import { Jumbotron, Button } from "reactstrap";
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
          <Button
            href="https://github.com/neighborhood-watch-alarm/nwa/tree/11d83f00f9597f55a790fb084a7eba421de260ca"
            target="_blank"
            rel="noopener noreferrer"
            outline
            color="danger"
          >
            {t("button")}
          </Button>
        </p>
      </Jumbotron>
    </>
  );
};

export default ServerPage;
