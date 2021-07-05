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
import Login from "./components/pages/Login";
import Post from "./components/pages/Posts/Post";
import { useStateValue } from "../src/StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div>
      {!user ? (
        <Login />
      ) : (
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />

            <Route path="/rooms/:roomId">
              <Chat />
            </Route>

            <Route path="/chat">
              <Chat />
            </Route>

            <Route path="/schedule">
              <SchedulerMain />
            </Route>


            <Route path="/social">
              <Post/>
            </Route>
            <Route path="/home" component={Home} />
            <Route path="/:url" component={Video} />
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
