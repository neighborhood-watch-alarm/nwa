import React from "react";
import { useTranslation } from "react-i18next";
import ToolDescription from "./ToolDescription.js";
import breadboard from "../Images/Fritzing/Images/breadboard.png";
import basic from "../Images/Fritzing/Images/NodeBasic.png";
import ReactPlayer from "react-player";


const AlarmSNBasic = props => {
  const { t } = useTranslation("alarm_v1");
  return (
    <div>
        <p>{t("guides.basic-intro")}</p>
        <h2>{t("guides.sn-title")}</h2>
        <p>
            {t("guides.sn-intro0")}
            <ToolDescription id="arduino-cp" name={t("tooltip.arduinoname")} description={t("tooltip.loraname")}/>
            {t("guides.sn-intro1")}
            </p>
        <h3>{t("guides.lora-title")}</h3>
        <p>
          {t("guides.lora-intro0")} 
          <ToolDescription id="shield-cp" name={t("tooltip.shieldname")} description={t("tooltip.shielddesc")}/>
          {t("guides.lora-intro1")}  
          <ToolDescription id="lora-cp" name={t("tooltip.loraname")} description={t("tooltip.loradesc")}/>
          {t("guides.lora-intro2")}
        </p>
        <ReactPlayer controls="true" url="https://www.youtube.com/watch?v=Mj7ApN0wvi8&t=7s" style={{ display: "block", marginLeft: "auto",
            marginRight: "auto" }} />
        <ul>
            <li>{t("guides.lora-list0")}</li>
            <li>{t("guides.lora-list1")}</li>
            <li>{t("guides.lora-list2-sn")}</li>
        </ul>
        
        
        {props.breadboard &&
            <div>
            <h3>{t("guides.breadboard-title")}</h3>
            <p>
                {t("guides.breadboard-intro0")}
                <ToolDescription id="breadboard-cp" name={t("tooltip.breadboardname")} description={t("tooltip.breadboarddesc")}/>
                {t("guides.breadboard-intro1")}  
            </p>
        
            <img
                src={breadboard}
                alt="Breadbord connection illustration"
                style={{ height: "auto", width: "100%", display: "block", marginLeft: "auto",
                marginRight: "auto", maxWidth: "700px" }}              
            /> 
            <p>{t("guides.breadboard-intro2")}</p>
            <img
                src={basic}
                alt="Breadboard connected to Sensor Node"
                style={{ height: "auto", width: "100%", display: "block", marginLeft: "auto",
                marginRight: "auto", maxWidth: "700px" }}
            /> 
            <ul>
                <li>{t("guides.breadboard-list0")}</li>
                <li>{t("guides.breadboard-list1")}</li>
            </ul>
            </div>
        }
        <p>{t("guides.sn-basic-outro")}</p>
      </div>
  );
};
export default AlarmSNBasic;

          