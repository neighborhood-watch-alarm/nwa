import React from "react";
import { Button } from "reactstrap";
import { Breadcrumb, BreadcrumbItem, Toast, ToastBody, ToastHeader } from "reactstrap";
import { NavLink as RouterNavLink, Link } from "react-router-dom";
import ToolDescription from "./ToolDescription.js";
import { useTranslation, Trans } from "react-i18next";
import rasImager from "../Images/rasImager.png";
import putty from "../Images/putty.png";
import winSCP from "../Images/winSCP.png";

const ServerRaspian = props => {
  const { t } = useTranslation("server_v1");
  return (
    <div>
      <h1>
        {t("os.title")}
        <span style={{ color: "grey", fontSize: "40%" }}>v1.0</span>
      </h1>
      <p>{t("os.intro")}</p>
      <hr />
      <h3>{t("os.os.title")}</h3>
      <p>
        <Trans i18nKey="server_v1:os.os.intro">
          The first step in the process after acquiring all the necesarry hardware is to download
          <ToolDescription id="rasImager" name="Raspberry Pi Imager" description={t("os.os.tooltip")} />
          from
          <a href="https://www.raspberrypi.org/downloads/" target="_blank" rel="noopener noreferrer">
            https://www.raspberrypi.org/downloads/.
          </a>
        </Trans>
      </p>
      <p>{t("os.os.imager")}</p>
      <img
        className="photo-logo"
        src={rasImager}
        alt="Raspberry Pi Imager Interface"
        style={{ paddingBottom: "20px", height: "auto", maxWidth: "100%" }}
      />
      <h3>
        {t("os.remote.title")}
        <span style={{ color: "grey", fontSize: "60%" }}>{t("os.remote.recommended")}</span>
      </h3>
      <h4>{t("os.remote.internet.title")}</h4>
      <p>
        <Trans i18nKey="server_v1:os.remote.internet.intro">
          The Raspberry Pi connects to the internet automatically through a LAN-cable. If you wish to use WiFi, you must
          first enable this. After the OS flashing described in the previous section is done, create the file
          <code>wpa-supplicant.conf</code> inside the "boot" folder on the SD Card (do not create a "boot" folder, as
          "boot" should be the first entry on the SD card. The file <code>kernel7.img</code> should be present in the
          correct destination):
        </Trans>
      </p>
      <Breadcrumb>
        <BreadcrumbItem active>path-to-sd-card/boot/wpa-supplicant.conf</BreadcrumbItem>
      </Breadcrumb>
      <p>{t("os.remote.internet.file")}</p>
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
      <p>{t("os.remote.internet.ready")}</p>
      <h4>{t("os.remote.ssh.title")}</h4>
      <p>
        <Trans i18nKey="server_v1:os.remote.ssh.intro">
          NWA recommends to use
          <ToolDescription id="ssh" name="SSH" description="Secure Shell: Cryptographic Network Protocol" /> for remote
          control of the Raspberry Pi. To enable this, create an empty file <code>ssh</code> at the same location as
          before. Do not put anything inside this file, and do not give it
          <ToolDescription id="fileEx" name="file extension:" description={t("os.remote.ssh.tooltip")} />
        </Trans>
      </p>
      <Breadcrumb>
        <BreadcrumbItem active>path-to-sd-card/boot/ssh</BreadcrumbItem>
      </Breadcrumb>
      <p>
        <Trans i18nKey="server_v1:os.remote.ssh.system">
          Both MacOS and Windows supports SSH nowadays, but on Windows some features are still limited. To ease up the
          process, NWA recommend that both users use the SSH client PuTTY. The program can be downloaded from
          <a
            href="https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html.
          </a>
        </Trans>
      </p>
      <p>{t("os.remote.ssh.putty")}</p>
      <img
        className="photo-logo"
        src={putty}
        alt="PuTTY Interface"
        style={{ paddingBottom: "20px", height: "auto", maxWidth: "100%" }}
      />
      <p>{t("os.remote.ssh.terminal")}</p>
      <Breadcrumb>
        <BreadcrumbItem active>$login as: pi</BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb>
        <BreadcrumbItem active>$pi@raspberrypi's password: raspberry</BreadcrumbItem>
      </Breadcrumb>
      <p>{t("os.remote.ssh.password")}</p>
      <Breadcrumb>
        <BreadcrumbItem active>$passwd</BreadcrumbItem>
      </Breadcrumb>
      <h4>{t("os.remote.java.title")}</h4>
      <p>{t("os.remote.java.intro")}</p>
      <Breadcrumb>
        <BreadcrumbItem active>$sudo apt update</BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb>
        <BreadcrumbItem active>$sudo apt install default-jdk</BreadcrumbItem>
      </Breadcrumb>
      <p>{t("os.remote.java.check")}</p>
      <Breadcrumb>
        <BreadcrumbItem active>$java -version</BreadcrumbItem>
      </Breadcrumb>
      <h4>{t("os.remote.SCP.title")}</h4>
      <p>
        <Trans i18nKey="server_v1:os.remote.SCP.intro">
          While it is possible to transer files with PuTTY or SSH in general through different extensions, NWA
          recommends to use
          <ToolDescription id="scp" name="SCP" description={t("os.remote.SCP.tooltip")} />
          for this. This is important as You will need to trasfer server files in the
          <Link to="/server/integration" className="alert-link">
            hardware integration
          </Link>
          section later.
        </Trans>
      </p>
      <p>{t("os.remote.SCP.system")}</p>
      <Breadcrumb>
        <BreadcrumbItem active>
          $scp &lt;filepath_local&gt; pi@&lt;ip_address&gt;:&lt;filepath_remote&gt;
        </BreadcrumbItem>
      </Breadcrumb>
      <p>{t("os.remote.SCP.adress")}</p>
      <Breadcrumb>
        <BreadcrumbItem active>$hostname -I;</BreadcrumbItem>
      </Breadcrumb>
      <p>
        <Trans i18nKey="server_v1:os.remote.SCP.winSCP">
          As Windows doesn't support SCP out of the box, you will need a program for this. NWA recommends WinSCP, as it
          is super simple to drag-n-drop files. You can donwload the program from
          <a href="https://winscp.net/eng/download.php" target="_blank" rel="noopener noreferrer">
            https://winscp.net/eng/download.php
          </a>
          .
        </Trans>
      </p>

      <p>{t("os.remote.SCP.gui")}</p>
      <img
        className="photo-logo"
        src={winSCP}
        alt="SCP Interface"
        style={{ paddingBottom: "20px", height: "auto", maxWidth: "100%" }}
      />

      <h3>
        {t("os.desktop.title")}
        <span style={{ color: "grey", fontSize: "60%" }}>{t("os.desktop.alternative")}</span>
      </h3>
      <p>{t("os.desktop.intro")}</p>
      <p>
        <Trans i18nKey="server_v1:os.desktop.setup">
          Therefore, the Raspberry Pi will need to be run as a desktop setup including screen, mouse and keyboard. The
          screen needs wo be connected with an hdmi cable, and the mouse and keyboard need to connected through wired
          USB cables at first, as bluetooth isn't enabled by dafault. The file transfering described in
          <Link to="/server/integration" className="alert-link">
            hardware integration
          </Link>
          will also need to be done using a regular USB drive. Note that Raspberry Pi OS doesn't support file exchange
          out of the box like Windows and MacOS does, as USB drives need to mounted and unmounted before use. More
          information regarding this matter can be found at Raspberry's
          <a
            href="https://www.raspberrypi.org/documentation/configuration/external-storage.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            documentation
          </a>
          .
        </Trans>
      </p>
      <p>{t("os.desktop.otherwise")}</p>
      <h3>{t("os.celService.title")}</h3>
      <p>
        <Trans i18nKey="server_v1:os.celService.section">
          To setup the Huawei USB Modem, simply pop off the back of the modem, insert the SIM card at the top (keep it
          in the big container), and plug it into your computer. Make sure the SIM card is activated beforehand. You
          should now automatically be directed to
          <a href="http://192.168.8.1/" target="_blank" rel="noopener noreferrer">
            http://192.168.8.1/
          </a>
          . If not, follow this link. From here enter the SIM Card's PIN code, and everything should be up and running
          shortly after. Once a connection is succesfully established, remove the USB modem from your computer and plug
          it into the Raspberry Pi. Remember the number of the SIM Card, as this is the number every household will get
          messages from.
        </Trans>
      </p>
      <Button className="float-right" tag={RouterNavLink} to="/server/connection" color="danger">
        {t("os.next")}
      </Button>
    </div>
  );
};

export default ServerRaspian;
