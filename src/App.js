import React, { Component, useState, useEffect } from "react";
import Video from "./Video";
import Home from "./Home";
import Header from "./components/Header";
import Chat from "./components/pages/Chat";
import SchedulerMain from "./components/pages/SchedulerMain";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/" exact component={Home} />

            <Route path="/chat">
              <Chat />
            </Route>

            <Route path="/schedule">
              <SchedulerMain />
            </Route>

            <Route path="/home" component={Home} />
            <Route path="/:url" component={Video} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
