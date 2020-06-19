import React from "react";
import { Button } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import ToolDescription from "./ToolDescription.js";
import { useTranslation } from "react-i18next";

const ServerDatabase = props => {
  const { t } = useTranslation("server_v1");
  return (
    <div>
      <p className="lead">
        <Button tag={RouterNavLink} to="/server/integration" color="danger">
          Next
        </Button>
      </p>
    </div>
  );
};

export default ServerDatabase;
