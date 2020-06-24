import React from "react";
import { useTranslation } from "react-i18next";
import ToolDescription from "./ToolDescription.js";
import breadboard from "../Images/Fritzing/Images/breadboard.png";
import basicBreadboard from "../Images/Fritzing/Images/ControlBasic_breadboard.png";
import basicPanic from "../Images/Fritzing/Images/ControlBasic_panic.png";
import basic from "../Images/Fritzing/Images/ControlBasic.png";
import ReactPlayer from "react-player";


const AlarmCPBasic = () => {
  const { t } = useTranslation("alarm_v1");
  return (
    <div>
        <p>{t("guides.basic-intro")}</p>
        <h2>{t("guides.cp-title")}</h2>
        <p>
            {t("guides.cp-intro0")}
            <ToolDescription id="arduino-cp" name={t("tooltip.arduinoname")} description={t("tooltip.loraname")}/>
            {t("guides.cp-intro1")}
            </p>
        <h3>{t("guides.lora-title")}</h3>
        <p>
          {t("guides.lora-intro0")} 
          <ToolDescription id="shield-cp" name={t("tooltip.shieldname")} description={t("tooltip.shielddesc")}/>
          {t("guides.lora-intro1")}  
          <ToolDescription id="lora-cp" name={t("tooltip.loraname")} description={t("tooltip.loradesc")}/>
          {t("guides.lora-intro2")}
        </p>
        <ReactPlayer controls="true" url="https://www.youtube.com/watch?v=0t-FHww_4uY" style={{ display: "block", marginLeft: "auto",
            marginRight: "auto" }} />
        <ul>
            <li>{t("guides.lora-list0")}</li>
            <li>{t("guides.lora-list1")}</li>
            <li>{t("guides.lora-list2")}</li>
        </ul>
        
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
            src={basicBreadboard}
            alt="Breadboard connected to Control Panel"
            style={{ height: "auto", width: "100%", display: "block", marginLeft: "auto",
            marginRight: "auto", maxWidth: "700px" }}
        /> 
        <ul>
            <li>{t("guides.breadboard-list0")}</li>
            <li>{t("guides.breadboard-list1")}</li>
        </ul>

        <h3>{t("guides.panic-title")}</h3>
        <p>{t("guides.panic-intro")}</p>
        <img
            src={basicPanic}
            alt="Panic button connected to Control Panel"
            style={{ height: "auto", width: "100%", display: "block", marginLeft: "auto",
            marginRight: "auto", maxWidth: "700px" }}              
        />
        <ul>
            <li>{t("guides.panic-list0")}</li>
            <li>{t("guides.panic-list1")}</li>
            <li>{t("guides.panic-list2")}</li>
            <li>
              {t("guides.panic-list3-0")}
              <ToolDescription id="resistor-cp" name={t("tooltip.resistorname")} description={t("tooltip.resistordesc")}/>
              {t("guides.panic-list3-1")}
            </li>
            <li>{t("guides.panic-list4")}</li>
        </ul>

        <h3>{t("guides.interface-title")}</h3>
        <p>
          {t("guides.interface-intro")}
          <ToolDescription id="lcd-cp" name={t("tooltip.lcdname")} description={t("tooltip.lcddesc")}/>
        </p>
        <img
            src={basic}
            alt="Basic Control Panel configuration, no sensors"
            style={{ height: "auto", width: "100%", display: "block", marginLeft: "auto",
            marginRight: "auto", maxWidth: "700px" }}              
        />
        <ul>
            <li>
              {t("guides.interface-list0-0")}
              <ToolDescription id="m2m-wires-cp" name={t("tooltip.m2mname")} description={t("tooltip.m2mdesc")}/>
              {t("guides.interface-list0-1")}
            </li>
            <li>{t("guides.interface-list1")}</li>
            <li>{t("guides.interface-list2")}
            <ToolDescription id="f2m-wires-cp" name={t("tooltip.f2mname")} description={t("tooltip.f2mdesc")}/>
            </li>
            <li>{t("guides.interface-list3")}</li>
            <li>{t("guides.interface-list4")}</li>
        </ul>
        <p>{t("guides.cp-basic-outro")}</p>
      </div>
  );
};
export default AlarmCPBasic;

          