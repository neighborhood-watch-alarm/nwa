import React from "react";
import { useTranslation } from "react-i18next";
import ToolDescription from "./ToolDescription.js";
import breadboard from "../Images/Fritzing/Images/breadboard.png";
import basicBreadboard from "../Images/Fritzing/Images/ControlBasic_breadboard.png";
import basicPanic from "../Images/Fritzing/Images/ControlBasic_panic.png";
import basic from "../Images/Fritzing/Images/ControlBasic.png";
import ReactPlayer from "react-player";


const AlarmCPUse = () => {
  const { t } = useTranslation("alarm_v1");
  return (
    <div>
      <h2>Using the Control Panel</h2>
      <p>The Control Panel is powered by plugging it into a 9V power supply. Alternately, the USB A to B cable used for intallation along with a 5V wall mount USB adaptor can also power the device.</p>
      <p>When placing the alarm device in your home, try to place it in a discreet position, and if possible, secure the sensor. When the device is moved, you run the risk of connections falling out. An ideal placement would be out of the way of daily movement, stored inside a box or casing with a cutout for the sensor. This would also help protect the device from dust.</p>
      <p>When starting up the device, the sensors recalibrate. This takes a few moments.</p>
      <p>Somewhere on the surface of the Arduino, there is a small button. When pressed, the Arduino and its software restarts. If a device is restarted while the house is armed, the device will be unarmed for a few minutes before becoming armed.</p>
      <p>In order to arm or disarm the system, type your PIN-code on the keypad followed by #. The LCD should indicate how many numbers you have typed. If you want to clear what you've typed, press *. When the pin code is sent, the screen will display a "Waiting for ack" message to indicate that it is expecting a response from the server. This may take several minutes, and your house is not armed before the response from the server arrives. Any other active alarm devices in your home will become armed within a few more minutes.</p>
      <p>Regardless of whether your house is armed, you can press the panic button to set off the alarm and notify your neighbors of a potential danger.</p>
      <p>Please note that your alarm device communicates with the server at a regular interval of a few minutes. This includes information on the panic and arming status of your home. If you have pressed the panic button or entered your PIN-code, you may have up to a few minutes before information is transmitted to the server. If your alarm is restarted within this time period, no information will be transmitted.</p>
      <p>If an alarm device stops communicating to the server, the server will sound the alarm. If your house is armed, your neighbors will be notified of the alarm. If not, only you will receive a text notofication on the status of your device.</p>
    </div>
  );
};
export default AlarmCPUse;

          