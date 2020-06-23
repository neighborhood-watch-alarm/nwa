import React from "react";
import { Button } from "reactstrap";
import { NavLink as RouterNavLink, Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import ToolDescription from "./ToolDescription.js";
import { useTranslation } from "react-i18next";

const ServerIntegration = props => {
  const { t } = useTranslation("server_v1");
  return (
    <div>
      <h1>
        Hardware Integration<span style={{ color: "grey", fontSize: "40%" }}>v1.0</span>
      </h1>
      <p>
        All the pieces from the previous guides will in this section be put together. Make sure you have completed all
        the steps described so far!
      </p>
      <hr />
      <h3>JAR file</h3>
      <p>
        To run the server program as an application you need to compile it into a runnable{" "}
        <ToolDescription
          id="jar"
          name="JAR-file."
          description="Java ARchive: Packed file featuring all necessary class files, metadata and resources."
        />{" "}
        To do so perfom the following steps in Eclipse:
      </p>
      <Breadcrumb>
        <BreadcrumbItem active>File -> Export -> Java/Runnable Jar file</BreadcrumbItem>
      </Breadcrumb>
      <p>
        Press next and then make sure that the "Launch Configuration" is set to the "Main_Method". Choose an export
        destination and click finish.
      </p>
      <h3>File Transfer</h3>
      <p>
        Once the JAR file has been succesfully compiled, proceed to transfer it using SCP as described in the{" "}
        <Link to="/server/os" className="alert-link">
          raspberry pi setup
        </Link>{" "}
        section alongside the files "send_sms.sh", "database_component.txt", "database_house.txt", "database_phone.txt"
        located in the root server folder. The files can be placed anywhere, but NWA recommends "Desktop" for
        convinience. Remember to retransfer the database files every time they are updated!
      </p>
      <p>
        Proceed to connect to the Raspberry Pi with PuTTY - also described in the raspberry pi section. Move to the
        destination of the files. If you have placed the files at Desktop, simply type in the command:
      </p>
      <Breadcrumb>
        <BreadcrumbItem active>$cd Desktop</BreadcrumbItem>
      </Breadcrumb>
      <p>
        To grant acces to the bash file <code>send_sms.sh</code> - which is necessary for the SMS capabilities - type in
        the command:
      </p>
      <Breadcrumb>
        <BreadcrumbItem active>$chmod +x ./send_sms.sh</BreadcrumbItem>
      </Breadcrumb>
      <p>You can check if the SMS capabilities work by directly running the bash script with the following command:</p>
      <Breadcrumb>
        <BreadcrumbItem active>$./send_sms.sh &lt;your_number&gt; &lt;content&gt;</BreadcrumbItem>
      </Breadcrumb>
      <p>If set up properly, you should recieve an SMS text shortly after with the given content.</p>
      <h3>Run Server</h3>
      <p>
        Run the JAR file with the command below. If everything works, you should again be promted with the message "
        <b>connected to the backend...</b>".
      </p>
      <Breadcrumb>
        <BreadcrumbItem active>$java -jar server.jar</BreadcrumbItem>
      </Breadcrumb>
      <Button className="float-right" tag={RouterNavLink} to="/server" color="danger">
        Done! Head back to main server page
      </Button>
    </div>
  );
};

export default ServerIntegration;
