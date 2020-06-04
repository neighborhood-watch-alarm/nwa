import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Container } from "reactstrap";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import TopNavbar from "./Components/TopNavbar";
import HomeJumbotron from "./Components/HomeJumbotron";
import ServerSideNav from "./Components/ServerSideNav";

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
        <TopNavbar className="App-navbar"></TopNavbar>
        <Switch>
          <Route exact path="/">
            <Container className="App-container">
              <HomeJumbotron className="App-greeting"></HomeJumbotron>
            </Container>
          </Route>
          <Route path="/server/" component={ServerSideNav} />
          <Redirect to="/" />
        </Switch>
        {/*<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{this.state.message}</p>
        </header>
        */}
      </div>
    );
  }
}

export default App;
