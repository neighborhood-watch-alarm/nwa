import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Button } from "reactstrap";
import ToolDescription from "./ToolDescription.js";
import previewImage from "../Images/alarmWelcome-preview.png";

const AlarmWelcome = props => {
  const { t } = useTranslation("alarm_v1");

  return (
    <div>
      <h1 className="display-5">{t("welcome.title")}</h1>
      <p>
        {t("welcome.alarms1")}
        <ToolDescription
          id="lora-welcome" 
          name={t("tooltip.loraname")} 
          description={t("tooltip.loradesc")}
        />
        {t("welcome.alarms2")}
      </p> 
      <p>
        <img className="photo-logo" src={previewImage} alt="Alarm system" style={{ paddingRight: "50px", height:"auto", maxWidth:"100%" }} />
      </p>
      <p>{t("welcome.design")}</p>
      <p className="lead">
        <Button block tag={RouterNavLink} to="/alarms/design/" color="danger">
          {t("navigation.design")}
        </Button>
      </p>
      <p>{t("welcome.install")}</p>
    </div>
  );
};

export default AlarmWelcome;
