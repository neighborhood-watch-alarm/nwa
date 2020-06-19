import React from "react";
import ToolDescription from "./ToolDescription.js";
import breadboard from "../Images/Fritzing/Images/breadboard.png";
import basicBreadboard from "../Images/Fritzing/Images/ControlBasic_breadboard.png";
import basicPanic from "../Images/Fritzing/Images/ControlBasic_panic.png";
import basic from "../Images/Fritzing/Images/ControlBasic.png";
import ReactPlayer from "react-player";


const AlarmCPBasic = () => {
  
  return (
    <div>
        <h2>Building a Control Panel</h2>
        <p>
            The basis of a Control Panel is an
            <ToolDescription id="arduino-cp" name="Arduino." description="An Arduino is a small computer that can run special Arduino software"/>
            This device uses the Arduino model Arduino Mega 2560 (as opposed to the smaller, less expensive Arduino UNO used for Sensor Nodes), as only the larger board supplies sufficient memory to run a Control Panel.</p>
        <h3>1. Arduino and LoRa shield</h3>
        <p>
            The Arduino needs a 
            <ToolDescription id="shield-cp" name="shield" description="A board that can be plugged on top of an Arduino and extend its capabilities"/>
            with
            <ToolDescription id="lora-cp" name="LoRa" description="Long Range, a low-power wide-area network (LPWAN) protocol"/>
            capabilities in order to enable communication between alarm devices and the neighborhood server.
        </p>
        <ReactPlayer controls="true" url="https://www.youtube.com/watch?v=9bZkp7q19f0" style={{ display: "block", marginLeft: "auto",
            marginRight: "auto" }} />
        <ul>
            <li>Attach the antenna to the side of the shield.</li>
            <li>Move the yellow pin marked J_DIO3 by lifting it away from the board and placing it back on only the innermost pin, as seen in the video below.</li>
            <li>Now place the shield on your Arduino, alligning all the connections closest to the end of the Arduino that has plugs.</li>
        </ul>
        
        <h3>2. Connect a breadboard</h3>
        <p>
            A
            <ToolDescription id="breadboard-cp" name="breadboard" description="A board with interconnected pins that can be used to connect wires without soldering"/>
            has pins that are connected in two connected outer rows on each side, and half columns in between, as shown in yellow on the below diagram. Plugging a wire into a pin on a row or column connects the wire to all pins on that row/column.
        </p>
        <img
            src={breadboard}
            alt="Breadbord connection illustration"
            style={{ height: "auto", width: "100%", display: "block", marginLeft: "auto",
            marginRight: "auto", maxWidth: "700px" }}              
        /> 
        <p>In order to connect components to the alarm device, you will use a breadboard.</p>
        <img
            src={basicBreadboard}
            alt="Breadboard connected to Control Panel"
            style={{ height: "auto", width: "100%", display: "block", marginLeft: "auto",
            marginRight: "auto", maxWidth: "700px" }}
        /> 
        <ul>
            <li>Power the breadboard by connecting the 5V pin on the Arduino to an outer row labeled on the breadboard with a male-to-male wire.</li>
            <li>On the same edge of the breadboard, use another wire to connect the second outer row to the ground by a GND pin on the Arduino.</li>
        </ul>

        <h3>3. Panic button</h3>
        <p>A panic button will enable you to activate the alarm at any time.</p>
        <img
            src={basicPanic}
            alt="Panic button connected to Control Panel"
            style={{ height: "auto", width: "100%", display: "block", marginLeft: "auto",
            marginRight: "auto", maxWidth: "700px" }}              
        />
        <ul>
            <li>Add a push button to the middle area of the breadboard.</li>
            <li>On the breadboard, connect the column of one pin of the push button to the 5V-powered row of the breadboard with a wire.</li>
            <li>On the other end of the push button, connect the column to wire to the A1 pin of the Arduino.</li>
            <li>On the same column, add a resistor the connects to a new column.</li>
            <li>The column containing the second wire of the resistor should be connected to the ground (GND) row of the breadboard.</li>
        </ul>

        <h3>4. Display and keypad</h3>
        <p>
            Now you are ready to add the interface of the Control Panel: The keypad and the 
            <ToolDescription id="lcd-cp" name="LCD." description="Liquid Crystal Display, a type of screen."/>
        </p>
        <img
            src={basic}
            alt="Basic Control Panel configuration, no sensors"
            style={{ height: "auto", width: "100%", display: "block", marginLeft: "auto",
            marginRight: "auto", maxWidth: "700px" }}              
        />
        <ul>
            <li>
                Take 8 
                <ToolDescription id="m2m-wires-cp" name="male-to-male wires" description="wires that have an outward pin at both ends"/>
                and connect the keypad pins from left to right to the Arduino pins 22-36.</li>
            <li>Dial up the contrast of the LCD by turning the screw-like dial on the back of the LCD about 45 degrees clockwise.</li>
            <li>Connect the GND and VCC pins on the LCD to the power and ground rows of the breadboard with 2
            <ToolDescription id="f2m-wires-cp" name="female-to-male wires." description="wires with an outgoing pin at one end and a plug-like pin at the other end"/>
            </li>
            <li>Using 2 female-to-male wires, connect the SDA and SCL of the LCD to two columns on the breadboard.</li>
            <li>Connect the columns to the corresponding SDA and SCL pins on the Arduino.</li>
        </ul>
        <p>Your Control Panel should now look like the above figure. At this point, all you need to add is a sensor.</p>
      </div>
  );
};
export default AlarmCPBasic;

          