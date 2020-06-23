import React from "react";
import { Button } from "reactstrap";
import { Breadcrumb, BreadcrumbItem, Toast, ToastBody, ToastHeader } from "reactstrap";
import { NavLink as RouterNavLink, Link } from "react-router-dom";
import ToolDescription from "./ToolDescription.js";
import { useTranslation } from "react-i18next";
import rasImager from "../Images/rasImager.png";
import putty from "../Images/putty.png";
import winSCP from "../Images/winSCP.png";

const ServerRaspian = props => {
  const { t } = useTranslation("server_v1");
  return (
    <div>
      <h1>
        Raspberry Pi Setup<span style={{ color: "grey", fontSize: "40%" }}>v1.0</span>
      </h1>
      <p>
        This section covers descriptions on how to prepare and install the necesarry system files to get Raspberry Pi OS
        up and running and how to interact with the Raspberry Pi. The process of setting up the WiFi modem and
        activating the SIM Card will also be explained.
      </p>
      <hr />
      <h3>Raspberry Pi OS / Raspbian</h3>
      <p>
        The first step in the process after acquiring all the necesarry hardware is to download{" "}
        <ToolDescription
          id="rasImager"
          name="Raspberry Pi Imager"
          description="Program that installs the Raspberry Pi operating system on an SD card"
        />{" "}
        from{" "}
        <a href="https://www.raspberrypi.org/downloads/" target="_blank" rel="noopener noreferrer">
          https://www.raspberrypi.org/downloads/.
        </a>
      </p>
      <p>
        When starting up the program, you should be met with a layout pretty similar to the one shown below. Make sure
        the Micro SD card is connected to your computer. Choose Raspberry Pi OS (former RASPBIAN) as the operating
        system and the inserted memory card as the SD card. Then proceed to press "write".
      </p>
      <img
        className="photo-logo"
        src={rasImager}
        alt="Raspberry Pi Imager Interface"
        style={{ paddingBottom: "20px", height: "auto", maxWidth: "100%" }}
      />
      <h3>
        Remote Control Setup<span style={{ color: "grey", fontSize: "60%" }}>Recomended</span>
      </h3>
      <h4>Internet Acces</h4>
      <p>
        The Raspberry Pi connects to the internet automatically through a LAN-cable. If you wish to use WiFi, you must
        first enable this. After the OS flashing described in the previous section is done, create the file{" "}
        <code>wpa-supplicant.conf</code> inside the "boot" folder on the SD Card (do not create a "boot" folder, as
        "boot" should be the first entry on the SD card. The file <code>kernel7.img</code> should be present in the
        correct destination):
      </p>
      <Breadcrumb>
        <BreadcrumbItem active>path-to-sd-card/boot/wpa-supplicant.conf</BreadcrumbItem>
      </Breadcrumb>
      <p>
        Paste the following content to the file, but make sure to change the countrycode and WiFi credentials to your
        personal details:
      </p>
      <div className="p-3 my-2 rounded">
        <Toast>
          <ToastHeader>wpa-supplicant.conf</ToastHeader>
          <ToastBody>
            ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
            <br /> update_config=1
            <br /> country=&lt;Insert country code here&gt;
            <br />
            <br /> network=&#123;
            <br /> ssid="&lt;Name of your WiFi&gt;" <br />
            psk="&lt; Password for your WiFi&gt;" <br />
            &#125;
          </ToastBody>
        </Toast>
      </div>
      <p>
        The Micro SD Card is now ready. Insert it into the Raspberry Pi, and proceed to plug in the USB cable. It should
        power on automatically.
      </p>
      <h4>SSH Configuration</h4>
      <p>
        NWA recommends to use
        <ToolDescription id="ssh" name="SSH" description="Secure Shell: Cryptographic Network Protocol" /> for remote
        control of the Raspberry Pi. To enable this, create an empty file <code>ssh</code> at the same location as
        before. Do not put anything inside this file, and do not give it{" "}
        <ToolDescription
          id="fileEx"
          name="file extension:"
          description="Do not change the name to ssh.txt, ssh.js and so on. Leave it blank."
        />
      </p>
      <Breadcrumb>
        <BreadcrumbItem active>path-to-sd-card/boot/ssh</BreadcrumbItem>
      </Breadcrumb>
      <p>
        Both MacOS and Windows supports SSH nowadays, but on Windows some features are still limited. To ease up the
        process, NWA recommend that both users use the SSH client PuTTY. The program can be downloaded from{" "}
        <a
          href="https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html.
        </a>
      </p>
      <p>
        When Launcing the program, you should be presented with an interface similar to image below. Put in
        "raspberrypi" as the host name and proceed to click "Open".
      </p>
      <img
        className="photo-logo"
        src={putty}
        alt="PuTTY Interface"
        style={{ paddingBottom: "20px", height: "auto", maxWidth: "100%" }}
      />
      <p>
        A terminal window should open up prompting for credentials. Enter "pi" as login and "raspberry" as the password
        like so:
      </p>
      <Breadcrumb>
        <BreadcrumbItem active>$login as: pi</BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb>
        <BreadcrumbItem active>$pi@raspberrypi's password: raspberry</BreadcrumbItem>
      </Breadcrumb>
      <p>
        You should now succesfully be connected to the Raspberry Pi's terminal. To make sure no one else can connect to
        it, change the password by typing in the command below. Proceed to type in your new password and repeat it one
        more time. Make sure you remember this password, as you will otherwise have to repeat all the steps in this
        guide.
      </p>
      <Breadcrumb>
        <BreadcrumbItem active>$passwd</BreadcrumbItem>
      </Breadcrumb>
      <h4>Java Installation</h4>
      <p>
        As the server program is written in Java you need to install the Java Development Kit. This is done by running
        the following commands in the PuTTY session while connected to the Raspberry Pi:
      </p>
      <Breadcrumb>
        <BreadcrumbItem active>$sudo apt update</BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb>
        <BreadcrumbItem active>$sudo apt install default-jdk</BreadcrumbItem>
      </Breadcrumb>
      <p>You can check to see if the install was succesfull by running the folowwing command:</p>
      <Breadcrumb>
        <BreadcrumbItem active>$java -version</BreadcrumbItem>
      </Breadcrumb>
      <h4>SCP</h4>
      <p>
        While it is possible to transer files with PuTTY or SSH in general through different extensions, NWA recommends
        to use{" "}
        <ToolDescription
          id="scp"
          name="SCP"
          description="Secure Copy Protocol: Transfer files between local and remote host"
        />{" "}
        for this. This is important as You will need to trasfer server files in the{" "}
        <Link to="/server/integration" className="alert-link">
          hardware integration
        </Link>{" "}
        section later.
      </p>
      <p>
        On MacOS and Linux SCP is natively supported. Therefore, you only need to type in the command below from the
        command line on your own computer(filepath_local is the absolute path to the file on the local system,
        filepath_remote is the absolute path on the Raspberry Pi to where you want the file to be stored, and ip_address
        is the ip address of the Raspberry Pi):
      </p>
      <Breadcrumb>
        <BreadcrumbItem active>
          $scp &lt;filepath_local&gt; pi@&lt;ip_address&gt;:&lt;filepath_remote&gt;
        </BreadcrumbItem>
      </Breadcrumb>
      <p>
        To find the ip address of the Raspberry Pi, simply type in the following command in the Rasperry Pi's terminal,
        while being connected through PuTTY:
      </p>
      <Breadcrumb>
        <BreadcrumbItem active>$hostname -I;</BreadcrumbItem>
      </Breadcrumb>
      <p>
        As Windows doesn't support SCP out of the box, you will need a program for this. NWA recommends WinSCP, as it is
        super simple to drag-n-drop files. You can donwload the program from{" "}
        <a href="https://winscp.net/eng/download.php" target="_blank" rel="noopener noreferrer">
          https://winscp.net/eng/download.php.
        </a>
      </p>
      <p>
        The user interface is very similar to PuTTY. Just pass in the credentials as shown below alongside your personal
        password and you will be good to go.
      </p>
      <img
        className="photo-logo"
        src={winSCP}
        alt="SCP Interface"
        style={{ paddingBottom: "20px", height: "auto", maxWidth: "100%" }}
      />
      <h3>
        Desktop Setup<span style={{ color: "grey", fontSize: "60%" }}>Alternative</span>
      </h3>
      <p>
        If the SIM card has sufficient 3G/4G capabilities, the USB modem can be used for both cellular service and
        internet connection. However, this means that remote control is not an option right away, as the Raspberry Pi no
        longer shares the same internet.
      </p>
      <p>
        Therefore, the Raspberry Pi will need to be run as a desktop setup including screen, mouse and keyboard. The
        screen needs wo be connected with an hdmi cable, and the mouse and keyboard need to connected through wired USB
        cables at first, as bluetooth isn't enabled by dafault. The file transfering described in{" "}
        <Link to="/server/integration" className="alert-link">
          hardware integration
        </Link>{" "}
        will also need to be done using a regular USB drive. Note that Raspberry Pi OS doesn't support file exchange out
        of the box like Windows and MacOS does, as USB drives need to mounted and unmounted before use. More information
        regarding this matter can be found at Raspberry's{" "}
        <a
          href="https://www.raspberrypi.org/documentation/configuration/external-storage.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          documentation.
        </a>
      </p>
      <p>Otherwise the setup looks pretty much like the one described above.</p>
      <h3>Cellular Service</h3>
      <p>
        To setup the Huawei USB Modem, simply pop off the back of the modem, insert the SIM card at the top (keep it in
        the big container), and plug it into your computer. Make sure the SIM card is activated beforehand. You should
        now automatically be directed to{" "}
        <a href="http://192.168.8.1/" target="_blank" rel="noopener noreferrer">
          http://192.168.8.1/
        </a>
        . If not, follow this link. From here enter the SIM Card's PIN code, and everything should be up and running
        shortly after. Once a connection is succesfully established, remove the USB modem from your computer and plug it
        into the Raspberry Pi. Remember the number of the SIM Card, as this is the number every household will get
        messages from.
      </p>
      <Button className="float-right" tag={RouterNavLink} to="/server/connection" color="danger">
        Next: Software Connection
      </Button>
    </div>
  );
};

export default ServerRaspian;
