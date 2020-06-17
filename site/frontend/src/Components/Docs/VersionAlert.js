import React from "react";
import { Alert } from "reactstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const VersionAlert = props => {
  const { t } = useTranslation("general");
  const { link } = props;
  return (
    <div>
      <Alert color="danger">
        {t("docs.oldVersion")}
        <Link to={link} className="alert-link">
          {t("docs.clickHere")}
        </Link>
      </Alert>
    </div>
  );
};

export default VersionAlert;
