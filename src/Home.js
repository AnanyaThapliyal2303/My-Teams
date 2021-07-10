import React, { Component } from "react";
import { Input, Button, IconButton } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import VideocamIcon from "@material-ui/icons/Videocam";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EventIcon from "@material-ui/icons/Event";
import Sidebar from "./components/Sidebar";
import "./Home.css";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import db from "./components/pages/firebase"
import firebase from "firebase"
function displayGo() {
  document.getElementById("joinDetails").style.display = "block";
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
    };
  }

  handleChange = (e) => this.setState({ url: e.target.value });

  join = () => {
    if (this.state.url !== "") {
      var url = this.state.url.split("/");
      window.location.href = `/${url[url.length - 1]}`;
    } else {
      var url = Math.random().toString(36).substring(2, 7);
      window.location.href = `/${url}`;
    }
  };

  

  render() {

    function start() {
      var url = Math.random().toString(36).substring(2, 7);
      window.open(`/${url}`,'_blank');
     
      db.collection("rooms").add({
        name:"Meeting: "+url,
    })
    .then((docRef) => {
       var roomId=docRef.id;
       db.collection("meetingLink").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        meetingUrl: url,
        fullUrl: url+" "+roomId,
        roomId: roomId,
      });
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
  
     
    }

    return (
      <div>
    
        <Header />
        <div className="container2">
          <Sidebar />
          <div className="call_class" id="callPage">
            <div className="call_options_grid">
              <div  id="videoIcon">
                <Link to="/video">
                  <VideocamIcon
                   id="home_icon"
                    onClick={start}
                    style={{
                      fontSize: 200,
                      color: "white",
                      marginBottom: "0rem",
                    }}
                    className="hvr-bob"
                  />
                </Link>
                <p id="text1">New Meeting</p>
              </div>
              <div  id="addIcon">
                <AddBoxIcon
                id="home_icon"
                  onClick={displayGo}
                  style={{
                    fontSize: 200,
                    color: "white",
                    marginBottom: "0rem",
                  }}
                  className="hvr-bob"
                />
                <p id="text2">Join a meeting</p>
                <div style={{ display: "none" }} id="joinDetails">
                  <Input
                    placeholder="URL"
                    onChange={(e) => this.handleChange(e)}
                    id="input_url"
                  />
                  <div id="go_btn">
                    <Button
                      id="btn"
                      variant="contained"
                      onClick={this.join}
                      style={{ margin: "20px", marginleft: "50%" }}
                    >
                      Go
                    </Button>
                  </div>
                </div>
              </div>
              <Link to="/schedule">
              <div id="eventIcon">
                <EventIcon
                 id="home_icon"
                  style={{
                    fontSize: 200,
                    color: "white",
                    marginBottom: "0rem",
                  }}
                  className="hvr-bob"
                />
                <p id="text3">Schedule</p>
              </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
