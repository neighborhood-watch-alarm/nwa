import React from "react";
import { Button } from "reactstrap";
import { Breadcrumb, BreadcrumbItem, Toast, ToastBody, ToastHeader } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import ToolDescription from "./ToolDescription.js";
import { useTranslation } from "react-i18next";
import importEclipse from "../Images/importEclipse.png";

const ServerConnection = props => {
  const { t } = useTranslation("server_v1");
  return (
    <div>
      <h1>
        Server Connection<span style={{ color: "grey", fontSize: "40%" }}>v1.0</span>
      </h1>
      <hr />
      <h3>Download of alarm system</h3>
      <p>
        You need to download the alarm system files at{" "}
        <a href="https://github.com/neighborhood-watch-alarm/nwa" target="_blank" rel="noopener noreferrer">
          https://github.com/neighborhood-watch-alarm/nwa
        </a>
        . Click "Clone or download" -> "Download ZIP". Once this has downloaded, unzip the folder and place it where you
        like.
      </p>
      <h3>Java IDE</h3>
      <p>
        To manipulate and compile the server files NWA recommends to use an{" "}
        <ToolDescription id="ide" name="IDE" description="Integrated Development Environment" /> optimized for{" "}
        <ToolDescription id="java" name="Java" description="Object oriented programming language" />
        development - particularly Eclipse. Eclipse can be downloaded from{" "}
        <a href="https://www.eclipse.org/downloads/" target="_blank" rel="noopener noreferrer">
          https://www.eclipse.org/downloads/.
        </a>
      </p>
      <p>
        If you do not already have Java installed, you need to download it from{" "}
        <a href="https://www.java.com/en/download/" target="_blank" rel="noopener noreferrer">
          https://www.java.com/en/download/.
        </a>
      </p>
      <p>In Eclipse, perform the following actions:</p>
      <Breadcrumb>
        <BreadcrumbItem active>
          File -> Import -> General/File System -> Browse -> path_to_folder/nwa/alarm-system/server
        </BreadcrumbItem>
      </Breadcrumb>
      <p>
        From here, make sure you check off all the files, then proceed to import it. Name it "server". The popup window
        should look something like this:
      </p>
      <img
        className="photo-logo"
        src={importEclipse}
        alt="Import of NWA Server"
        style={{ paddingBottom: "20px", height: "auto", maxWidth: "100%" }}
      />
      <h3>TTN Connection</h3>
      <p>
        After the project has been imported, expand it and open the file <code>MSGRecver.java</code> at:
      </p>
      <Breadcrumb>
        <BreadcrumbItem active>src/main/java/dtu.ttnCommunication/MSGRecver.java</BreadcrumbItem>
      </Breadcrumb>
      <p>
        You need to edit the three strings region (i.e. "eu"), appID(the chosen name of the TTN app) and
        appAccessKey(the one you were told to save for later):
      </p>
      <div className="p-3 my-2 rounded">
        <Toast>
          <ToastHeader>MSGRecver.java</ToastHeader>
          <ToastBody>
            ...
            <br /> String region = "&lt;your_region&gt;";
            <br /> String appID = "&lt;your_app_name&gt;";
            <br /> appAccessKey = "&lt;64bit_acces_key&gt;";
            <br /> ...
          </ToastBody>
        </Toast>
      </div>
      <p>
        To make sure you have done the steps correctly, give it a trial run by right clicking on the imported project
        and perform the actions below.
      </p>
      <Breadcrumb>
        <BreadcrumbItem active>Run as -> Java Application -> Main_Method</BreadcrumbItem>
      </Breadcrumb>
      <p>
        This should cause the Console to print out "<b>connected to the backend...</b>". Make sure you close it down
        again.
      </p>
      <Button className="float-right" tag={RouterNavLink} to="/server/database" color="danger">
        Next: Database Setup
      </Button>
    </div>
  );
};

export default ServerConnection;
