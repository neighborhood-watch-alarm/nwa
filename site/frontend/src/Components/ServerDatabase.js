import React from "react";
import { Button } from "reactstrap";
import { NavLink as RouterNavLink, Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import ToolDescription from "./ToolDescription.js";
import { useTranslation } from "react-i18next";
import databaseIMG from "../Images/database.png";
import mainMethod from "../Images/mainMethod.png";

const ServerDatabase = props => {
  const { t } = useTranslation("server_v1");
  return (
    <div>
      <h1>
        Database Setup<span style={{ color: "grey", fontSize: "40%" }}>v1.0</span>
      </h1>
      <hr />
      <h3>Update Houses</h3>
      <p>
        To edit or update the database, open the file <code>SetupExample.java</code> at:
      </p>
      <Breadcrumb>
        <BreadcrumbItem active>src/main/java/dtu.exampleFile/SetupExample.java</BreadcrumbItem>
      </Breadcrumb>
      <p>
        Scroll down to the fields similar to the ones below. Every house in the neighborhood that is part of the system
        needs to be defined like this - with a salt, HoueID, house, devices and a phone number. The salt is a unique
        array of hexadecimals used to identify houses. Each hexadecimal can have practically any value folloing the
        conventions, but make sure to leave the last two unused (0x00). If a house has more or less devices, simply add
        or remove similar lines. The identifiers needs to be unique (otherwise Java will complain as well).
      </p>
      <img
        className="photo-logo"
        src={databaseIMG}
        alt="Sample database setup"
        style={{ height: "auto", maxWidth: "100%" }}
      />
      <p>
        <b>
          Make sure you remember to add the devices to the arrays "houseDB", "deviceDB" and "phoneAddrDB" like shown
          above!
        </b>
      </p>
      <h3>Implement Updates</h3>
      <p>
        To run database updates like described above, you need to run the file <code>Main_Method.java</code> at:
      </p>
      <Breadcrumb>
        <BreadcrumbItem active>src/main/java/dtu.dtu.alarmSystemBackend/Main_Method.java</BreadcrumbItem>
      </Breadcrumb>
      <p>
        Scroll down to the method similar to the one shown below and make sure to{" "}
        <ToolDescription id="slashes" name="uncomment" description="remove the two slashes" /> the line{" "}
        <i>SetupExample.testing(args);</i>
      </p>
      <img
        className="photo-logo"
        src={mainMethod}
        alt="run the database setup"
        style={{ height: "auto", maxWidth: "100%" }}
      />
      <p>
        Then proceed to run the application as described in the{" "}
        <Link to="/server/connection" className="alert-link">
          server connection
        </Link>{" "}
        section. The databases should now be updated. Remember to comment the line out again.
      </p>
      <Button className="float-right" tag={RouterNavLink} to="/server/integration" color="danger">
        Next: Hardware Integration
      </Button>
    </div>
  );
};

export default ServerDatabase;
