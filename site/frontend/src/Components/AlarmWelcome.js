import React from "react";
//import { useTranslation } from "react-i18next";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Button } from "reactstrap";
import previewImage from "../Images/alarmWelcome-preview.png";

const AlarmWelcome = props => {
  //const { t } = useTranslation("alarm_v1");


  return (
    <div>
      <h1 className="display-5">Alarms</h1>
      <p>Alarms are sensor devices that you can assemble from parts. If a server is set up in your neighborhood, the alarms can be used to alert you and your neighbors in the event of a break-in.</p> 
      <p>
        <img className="photo-logo" src={previewImage} alt="Alarm system" style={{ paddingRight: "50px", height:"auto", maxWidth:"100%" }} />
      </p>
      <p>When setting up alarms, you must first decide which alarms to build and order parts. This is done from the Design section.</p>
      <p className="lead">
        <Button tag={RouterNavLink} to="/alarms/design/" color="danger">
          Design
        </Button>
      </p>
      <p> When you have all the necessary parts, you can proceed to install your alarms. Please open the relevant Installation Guides from the page menu.</p>
    </div>
  );
};

export default AlarmWelcome;
