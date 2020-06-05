import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import TopNavbar from "./Components/TopNavbar";
import HomePage from "./Components/HomePage";
import ServerPage from "./Components/ServerPage";

class App extends Component {
  constructor(props) {
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
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <TopNavbar></TopNavbar>
        </header>
        <body className="App-body" style={{ paddingTop: "50px" }}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/server" component={ServerPage} />
            <Redirect to="/" />
          </Switch>
        </body>
        <footer className="App-footer">
          {/*<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{this.state.message}</p>
        </header>
        */}
        </footer>
      </div>
    );
  }
}

export default App;
