import React, { Component } from 'react';
import { Button, Card, CardBody, InputGroup, InputGroupAddon, InputGroupText, Form, Input, FormGroup, Label} from 'reactstrap';
import PartsTable from "./PartsTable";



class DeviceForm extends Component {
  deviceTypes = ["Control Panel", "Sensor Node"];
  defaultDevice = this.deviceTypes[0];
  state = {
    inputs: [
      {
        name: "",
        device: this.defaultDevice
      }
    ]
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
    this.setState(({inputs}) => ({inputs: inputs.concat([{name: "", device: this.defaultDevice}])}));
  };


  // var person = {firstName:"John", lastName:"Doe", age:46}; 
  // person.firstName -> John

  //this.setState({      date: new Date()    });

  //this.setState((state, props) => ({
    //counter: state.counter + props.increment (map over state, opdater værdier til index)
  //}));

  removeInput(index) {
    this.setState(({inputs}) => {
      const newInputs = inputs.slice();
      newInputs.splice(index, 1);
      console.log("newInputs=", newInputs);
      return ( {inputs: newInputs} )})
  };

  onNameChange(idx, event) {
    // console.log(idx);
    // console.log(event.target.value);
    const targetval = event.target.value;
    this.setState(({inputs}) => {
      const newInputs = inputs.slice();
      newInputs[idx].name = targetval;
      console.log("newInputs=", newInputs);
      return ( {inputs: newInputs} )})
  }

  onDeviceChange(idx, event) {
    const targetval = event.target.value;
    this.setState(({inputs}) => {
      const newInputs = inputs.slice();
      newInputs[idx].device = targetval;
      console.log("newInputs=", newInputs);
      return ( {inputs: newInputs} )})
  }
  
  inputsToJSON = () => {
    let inputsList = this.state.inputs.slice();

    inputsList.forEach((item, idx) => {
      item.name=(idx + 1).valueOf().toString().concat(". ", item.name)
    });

    return(JSON.stringify(inputsList))
  }


  onSubmit = () => {
    console.log("submit: ", this.inputsToJSON());
  };

  onEmailSubmit = () => {
    console.log("submit: ", this.state);
  };

  render() {

    const post = {"devicec": [
      {
          "name": "01-office",
          "type": "cp-lidar"
      },
      {
          "name": "02-bedroom",
          "type": "sn-us"
      },
      {
          "name": "03-door",
          "type": "cp-lidar"
      }
    ]};
  
    const response = {"parts": [
      {
          "model": "PIR",
          "amount": "2",
          "link": "facebook.com"
      },
      {
          "model": "LIDAR-Lite v3",
          "amount": "1",
          "link": "twitter.com"
      },
    ]};


    console.log(this.state);
    const { errors, values } = this.state;
    return (
      <div>
        <Form>
          
          {this.state.inputs.map((input, idx) => //onChange={this.props.handleInputChange}
            <Card style={{marginBottom:"10px"}} key={idx}>
              <CardBody>
                <div className="row">
                  <div className="col">
                    <InputGroup style={{maxWidth:"300px" }}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>{idx+1}.</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="text" value={this.state.inputs[idx].name} id={idx} placeholder="Name" onChange={(e) => this.onNameChange(idx, e)}/>  
                    </InputGroup>
                  </div>
                  <div className="col" style={{maxWidth:"300px" }}>
                    <Input type="select" name="select" defaultValue={this.defaultDevice} value={this.state.inputs[idx].device} id={'row_quantity_'+idx} onChange={(e) => this.onDeviceChange(idx, e)}>
                      {this.deviceTypes.map((device) =>
                        <option>{device}</option>
                      )}
                    </Input>
                  </div>
                  <Button close onClick={()=> this.removeInput(idx)}/>
                </div>
              </CardBody>
            </Card>
          )}
          <Button color="danger" outline block onClick={this.addInput}>Add device</Button>{' '}
          <Button className="float-right" block color="danger"style={{marginTop:"10px", marginBottom:"30px"}} onClick={this.onSubmit}>Build parts list</Button>
          <PartsTable partsList={this.state.partsList} />
          <FormGroup>
            <Label for="email">Address</Label>
            <Input type="email" name="email" value={this.state.email} placeholder="example@domain.com" style={{maxWidth:"100%"}} onChange={(e) => this.onEmailChange}/>  
          </FormGroup>
          <Button className="float-right" block color="danger"style={{marginTop:"10px", marginBottom:"30px"}} onClick={this.onEmailSubmit}>Send email</Button>
        </Form>

      </div>
    )
  }
}

export default DeviceForm;
