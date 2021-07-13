import React, { Component, useState, useEffect } from "react";
import Video from "./Video";
import Home from "./Home";
import Header from "./components/Header";
import Chat from "./components/pages/Chat";
import EventScheduler from "./components/pages/ScheduleEvents/EventScheduler";
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
import Notes from "./components/pages/Notes/Notes";
import { useStateValue } from "../src/StateProvider";
{/*import Todo from "./components/pages/Todo/Todo";*/}


//uses Switch and Route components to connect various pages with sidebar
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

            <Route path="/notes">
              <Notes/>
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
