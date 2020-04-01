import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/Dashboard.js";
import { SubForm } from "./components/SubForm/SubForm.js";
import SideMenu from "./components/SideMenu/SideMenu.js";
import { Login } from "./components/Login/Login.js";
import { Signup } from "./components/Signup/Signup.js";
import { PrivateRoute } from "./components/PrivateRoute.js";
import "./App.css";
import "./components/Dashboard/Dashboard.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-content">
          <Switch>
            <Route exact path="/" component={SubForm} />
            <Route path="/dashboard" component={Dashboard} />
            {/*
            <SideMenu id="2" />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            */}
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;