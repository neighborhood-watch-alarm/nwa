import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane, Col, Row, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { useTranslation } from "react-i18next";

import ToolDescription from "./ToolDescription.js";
import classnames from 'classnames';
import lidarDiagram from "../Images/Fritzing/Images/NodeLIDAR.png";
import newFile from "../Images/arduino-new.png";
import libManager from "../Images/arduino-lib-man.png";
import ttnCode from "../Images/arduino-ttn-code.png";
import serial from "../Images/arduino-serial.png";
import AlarmSNBasic from "./AlarmSNBasic.js";
import AlarmSNUse from "./AlarmSNUse.js";


const AlarmSNLidar = props => {
  const { t } = useTranslation("alarm_v1");

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleVersion = () => setDropdownOpen(prevState => !prevState);

  return (
    <div>
      <h1>{t("navigation.sn-lidar")}
        <ButtonDropdown isOpen={dropdownOpen} size="sm" toggle={toggleVersion} style={{paddingLeft: "10px", display: "inline-block"}}>
          <DropdownToggle outline caret>
            {t("guides.version")}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>1.0</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </h1>
      
      <p>{t("guides.cp-lidar-intro")}
      </p>
      <p>
        {t("guides.tooltip-explain0")}
        <ToolDescription id="tooltip-snlidar" name={t("tooltip.tooltipname")} description={t("tooltip.tooltipdesc")}/>
        {t("guides.tooltip-explain1")}
      </p>
      
      <Nav tabs style={{marginBottom:"30px"}}>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            {t("guides.tab-hardware")}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            {t("guides.tab-software")}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            {t("guides.tab-use-sn")}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col>
              <img
                src={lidarDiagram}
                alt="LIDAR Sensor Node hookup diagram"
                style={{ height: "auto", maxWidth: "100%" }}
              />
            </Col>
            <Col>
              <h3>{t("guides.parts-list")}</h3>
              <ul>
                <li>1 {t("guides.part.mega")}</li>
                <li>1 {t("guides.part.lora")}</li>
                <li>1 {t("guides.part.keypad")}</li>
                <li>1 {t("guides.part.lcd")}</li>
                <li>1 {t("guides.part.breadboard")}</li>
                <li>1 {t("guides.part.button")}</li>
                <li>1 &gt;1kω {t("guides.part.resistor")}</li>
                <li>1 {t("guides.part.lidar")}</li>
                <li>5 {t("guides.part.m2m")}</li>
                <li>2 {t("guides.part.jump")}</li>
                <li>4 {t("guides.part.f2m")}</li>
              </ul>
            </Col>
          </Row>
          <AlarmSNBasic breadboard={true}/>
          <h3>{t("guides.lidar-title")}</h3>
          <p>{t("guides.lidar-intro")}</p>
          
          <img
            src={lidarDiagram}
            alt="LIDAR Control Panel hookup diagram"
            style={{ height: "auto", width: "100%", display: "block", marginLeft: "auto",
            marginRight: "auto", maxWidth: "700px" }}          />        
          
          <ul>
            <li>{t("guides.lidar-list0")}</li>
            <li>{t("guides.lidar-list1")}</li>
            <li>{t("guides.lidar-list2")}</li>
            <li>{t("guides.lidar-list3")}</li>
            <li>{t("guides.lidar-list4")}</li>
          </ul>
          <p>{t("guides.cp-hardware-outro")}</p>
          <Button className="float-right" color="danger" onClick={() => { toggle('2'); window.scrollTo(0, 0);}}>{t("guides.next-tab")}{t("guides.tab-software")}</Button>
        </TabPane>
        <TabPane tabId="2">
          <h2>{t("guides.software.ide-title")}</h2>
          <p>{t("guides.software.ide-intro")}</p>
          <h3>{t("guides.parts-list")}</h3>
          <ul>
            <li>{t("guides.software.a-lidar-cp")}</li>
            <li>{t("guides.software.list-ttn")}</li>
            <li>{t("guides.software.list-computer")}</li>
            <li>{t("guides.software.list-cable")}</li>
          </ul>
          <p>
            {t("guides.software.ide-install0")}{" "}
            <a href="https://www.arduino.cc/en/main/software" target="_blank" rel="noopener noreferrer">
              Arduino IDE
            </a>{" "}
            {t("guides.software.ide-install1")}
            <ToolDescription id="ide-snlidar" name={t("tooltip.idename")} description={t("tooltip.idedesc")}/>
            {t("guides.software.ide-install2")}
          </p>
          <p>{t("guides.software.new-file")}</p>
          
          <img
            src={newFile}
            alt="New button in Arduino IDE for creating new files"
            style={{ height: "auto", width: "100%", display: "block", marginLeft: "auto",
            marginRight: "auto", maxWidth: "400px", paddingBottom: "30px"}}
          />          
          <p>
            {t("guides.software.sn-code0")}{" "}
            <a href="https://raw.githubusercontent.com/neighborhood-watch-alarm/nwa/master/alarm-system/alarm/control-panel/Alarm_control_panel_Lidar.ino" target="_blank" rel="noopener noreferrer">
            {t("guides.software.sn-code-lidar")}
            </a>{" "}
            {t("guides.software.sn-code1")}
          </p>
          
          <h3>{t("guides.software.lib-title")}</h3>
          <p>
            {t("guides.software.lib-intro0")}
            <ToolDescription id="lib-snlidar" name={t("tooltip.libname")} description={t("tooltip.libdesc")}/>
            {t("guides.software.lib-intro1")}
          </p>
          
          <h4>{t("guides.software.lib-ide-title")}</h4>
          <p>{t("guides.software.lib-ide-intro0")}</p>
          
          <img
            src={libManager}
            alt="Navigation of arduino IDE tabs to find Library Manager: (Sketch -> Include Library -> Manage Libraries)"
            style={{ height: "auto", width: "100%", display: "block", marginLeft: "auto",
            marginRight: "auto", maxWidth: "700px", paddingBottom: "30px" }}
          /> 
          
          <p>{t("guides.software.lib-ide-intro1")}</p>
          <ul>
            <li><b>LIDAR-Lite</b>{" "}{t("guides.software.lib-by")}{" "}<b>Garmin</b>{" "}{t("guides.software.lib-version")}{" "}<b>3.0.2</b></li>
          </ul>
          
          <h4>{t("guides.software.lib-zip-title")}</h4>
          <p>
            {t("guides.software.lib-zip-lmic0")}{" "}
            <a href="https://github.com/matthijskooijman/arduino-lmic" target="_blank" rel="noopener noreferrer">{t("guides.software.lib-zip-lmic1")}</a>{" "}
            {t("guides.software.lib-zip-lmic2")}
          </p>
          
          <h3>{t("guides.software.upload-title")}</h3>
          <p>{t("guides.software.upload-ttn")}</p>
          <p>{t("guides.software.save")} "01_sn_lidar.ino".</p>

          <img
            src={ttnCode}
            alt="Code section with NWKSKEY, APPSKEY, and DEVADDR which must be specified"
            style={{ height: "auto", width: "100%", display: "block", marginLeft: "auto",
            marginRight: "auto", maxWidth: "1000px", paddingBottom: "30px" }}
          /> 
          
          <p>{t("guides.software.upload-board-uno")}</p>
          
          <p>{t("guides.software.upload-connect-sn")}</p>
          <p>{t("guides.software.upload-sn")}</p>
          
          <img
            src={serial}
            alt="Serial monitor output example."
            style={{ height: "auto", width: "100%", display: "block", marginLeft: "auto",
            marginRight: "auto", maxWidth: "400px", paddingBottom: "30px" }}
          />
          
  <p>{t("guides.software.outro-sn")}</p>
          <Button className="float-right" color="danger" onClick={() => { toggle('3'); window.scrollTo(0, 0);}}>{t("guides.next-tab")}{t("guides.tab-use-cp")}</Button>
        </TabPane>
        <TabPane tabId="3">
          <AlarmSNUse/>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default AlarmSNLidar;