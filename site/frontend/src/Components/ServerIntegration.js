import React from "react";
import { Button } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import ToolDescription from "./ToolDescription.js";
import { useTranslation } from "react-i18next";

const ServerIntegration = props => {
  const { t } = useTranslation("server_v1");
  return (
    <div>
      <p className="lead">
        <Button tag={RouterNavLink} to="/server" color="danger">
          Done
        </Button>
      </p>
    </div>
  );
};

export default ServerIntegration;
