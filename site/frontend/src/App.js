import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import TopNavbar from "./Components/TopNavbar";
import HomePage from "./Components/HomePage";
import ServerPage from "./Components/ServerPage";
import ServerVersionRouter from "./Components/Docs/ServerVersionRouter.js";
import AlarmPage from "./Components/AlarmPage";
import HelpPage from "./Components/HelpPage";
import ContributePage from "./Components/ContributePage";


class App extends Component {
  /*constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  componentDidMount() {
    return fetch("/api/email")
      .then(res => res.json())
      .then(resJSON => {
        this.setState({
          message: "Backend: " + resJSON.message
        });
      });
  }*/

  render() {
    return (
      <>
        <div className="App-header">
          <TopNavbar></TopNavbar>
        </div>
        <div className="App-body" style={{ paddingTop: "50px" }}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/server" component={ServerPage} />
            <Route path="/alarms" component={AlarmPage} />
            <Route exact path="/help" component={HelpPage} />
            <Route exact path="/contribute" component={ContributePage} />
            <Route path="/docs/server" component={ServerVersionRouter} />
            <Redirect to="/" />
          </Switch>
        </div>
      </>
    );
  }
}

export default App;
