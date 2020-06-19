import React, { Component, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  Input,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import PartsTable from "./PartsTable";

class DeviceForm extends Component {
  deviceTypes = [
    "Control Panel - LIDAR",
    "Control Panel - PIR",
    "Control Panel - Ultrasonic",
    "Sensor Node - LIDAR",
    "Sensor Node - PIR",
    "Sensor Node - Ultrasonic"
  ];
  defaultDevice = this.deviceTypes[0];
  state = {
    inputs: [
      {
        name: "",
        type: this.defaultDevice
      }
    ],
    partsList: [],
    email: ""
  };

  //constructor(props){
  //  super(props);
  //  if (props.deviceList) {
  //    this.state = {inputs: props.deviceList.splice()}
  //  } else {
  //    this.state = {inputs: [0]};
  //  }

  //this.handleClick = this.handleClick.bind(this);
  //}

  addInput = () => {
    this.setState(({ inputs }) => ({ inputs: inputs.concat([{ name: "", type: this.defaultDevice }]) }));
  };

  // var person = {firstName:"John", lastName:"Doe", age:46};
  // person.firstName -> John

  //this.setState({      date: new Date()    });

  //this.setState((state, props) => ({
  //counter: state.counter + props.increment (map over state, opdater værdier til index)
  //}));

  removeInput(index) {
    this.setState(({ inputs }) => {
      const newInputs = inputs.slice();
      newInputs.splice(index, 1);
      console.log("newInputs=", newInputs);
      return { inputs: newInputs };
    });
  }

  onNameChange(idx, event) {
    // console.log(idx);
    // console.log(event.target.value);
    const targetval = event.target.value;
    this.setState(({ inputs }) => {
      const newInputs = inputs.slice();
      newInputs[idx].name = targetval;
      console.log("newInputs=", newInputs);
      return { inputs: newInputs };
    });
  }

  onTypeChange(idx, event) {
    const targetval = event.target.value;
    this.setState(({ inputs }) => {
      const newInputs = inputs.slice();
      newInputs[idx].type = targetval;
      console.log("newInputs=", newInputs);
      return { inputs: newInputs };
    });
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  inputsToJSON = () => {
    let inputsList = JSON.parse(JSON.stringify(this.state.inputs));

    inputsList.forEach((item, idx) => {
      item.name = (idx + 1)
        .valueOf()
        .toString()
        .concat(". ", item.name);
    });

    return JSON.stringify({ devices: inputsList });
  };

  onSubmit = () => {
    const requestDetails = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: this.inputsToJSON()
    };
    fetch("/api/component", requestDetails)
      .then(response => response.json())
      .then(json => {
        this.setState({ partsList: json.components });
      });
  };

  onEmailSubmit = () => {
    var post = JSON.parse(this.inputsToJSON());
    post.email = this.state.email;
    post = JSON.stringify(post);

    const requestDetails = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: post
    };
    fetch("/api/component", requestDetails)
      .then(response => response.json())
      .then(json => {
        this.setState({ email: "" });
      });
  };

  render() {
    const post = {
      devicec: [
        {
          name: "01-office",
          type: "cp-lidar"
        },
        {
          name: "02-bedroom",
          type: "sn-us"
        },
        {
          name: "03-door",
          type: "cp-lidar"
        }
      ]
    };

    console.log(this.state);
    return (
      <div>
        <Form>
          {this.state.inputs.map((
            input,
            idx //onChange={this.props.handleInputChange}
          ) => (
            <Card style={{ marginBottom: "10px" }} key={idx}>
              <CardBody>
                <div className="row">
                  <div className="col">
                    <InputGroup style={{ maxWidth: "300px" }}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>{idx + 1}.</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="text"
                        value={this.state.inputs[idx].name}
                        id={idx}
                        onChange={e => this.onNameChange(idx, e)}
                      />
                    </InputGroup>
                  </div>
                  <div className="col" style={{ maxWidth: "300px" }}>
                    <Input
                      type="select"
                      name="select"
                      defaultValue={this.defaultDevice}
                      value={this.state.inputs[idx].type}
                      id={"row_quantity_" + idx}
                      onChange={e => this.onTypeChange(idx, e)}
                    >
                      {this.deviceTypes.map(type => (
                        <option>{type}</option>
                      ))}
                    </Input>
                  </div>
                  <Button close style={{ marginRight: "10px" }} onClick={() => this.removeInput(idx)} />
                </div>
              </CardBody>
            </Card>
          ))}
          <Button color="danger" outline block onClick={this.addInput}>
            Add device
          </Button>{" "}
          <Button
            className="float-right"
            block
            color="danger"
            style={{ marginTop: "10px", marginBottom: "30px" }}
            onClick={this.onSubmit}
          >
            Build parts list
          </Button>
          <PartsTable partsList={this.state.partsList} />
          <FormGroup>
            <Label for="email">Address</Label>
            <Input
              type="email"
              name="email"
              value={this.state.email}
              style={{ maxWidth: "100%" }}
              onChange={e => this.onEmailChange(e)}
            />
          </FormGroup>
          <Button
            className="float-right"
            block
            color="danger"
            style={{ marginTop: "10px", marginBottom: "30px" }}
            onClick={() => {
              this.disabled = true;
              this.value = "Email sent";
              this.onEmailSubmit();
            }}
          >
            Send email
          </Button>
        </Form>
      </div>
    );
  }
}

export default DeviceForm;