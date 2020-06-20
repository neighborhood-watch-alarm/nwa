import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

const EditText = props => {
  const { buttonLabel, link, fileName } = props;
  const { t } = useTranslation("general");

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button outline color="danger" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{t("improve.popup.title")}</ModalHeader>
        <ModalBody>
          <Trans i18nKey="improve.popup.description">
            As NWA is an open source project, all the material regarding both the alarmsystem and this website is public
            available on
            <a href="https://github.com/neighborhood-watch-alarm/nwa" target="_blank" rel="noopener noreferrer">
              Github
            </a>
            . The written material showcased in this guide is loaded from the file <code>{{ fileName }}</code>, divided
            into different categories representing the different sections. By editing a category in this file, the
            corresponding section on this page will be changed automatically. For security reasons all requested updates
            will be checked by an authorized contributer before launching.
          </Trans>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle} href={link} target="_blank">
            {t("improve.popup.link")}
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            {t("improve.popup.cancel")}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditText;
