import React from "react";
import { useTranslation } from "react-i18next";

const AlarmCPUse = () => {
  const { t } = useTranslation("alarm_v1");
  return (
    <div>
      <h2>{t("guides.tab-use-cp")}</h2>
      <p>{t("guides.use.arm")}</p>
      <p>{t("guides.use.restart")}</p>
      <p>{t("guides.use.calibrate")}</p>
      <p>{t("guides.use.alarm")}</p>
      <p>{t("guides.use.panic")}</p>
      <p>{t("guides.use.interval-cp")}</p>
      <p>{t("guides.use.offline")}</p>
      <p>{t("guides.use.power")}</p>
      <p>{t("guides.use.placement")}</p>

    </div>
  );
};
export default AlarmCPUse;

          