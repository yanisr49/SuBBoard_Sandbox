import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/Dashboard.js";
import { SubForm } from "./components/SubForm/SubForm.js";
import { Subscription } from "./components/SubForm/Subscription.js";
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
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/subscription/new" component={SubForm} />
            <PrivateRoute exact path="/subscription" component={Subscription} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;