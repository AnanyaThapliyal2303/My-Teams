import React, { Component } from "react";
import io from "socket.io-client";
import faker from "faker";
import emailjs from "emailjs-com";
import { IconButton, Badge, Input, Button } from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import StopScreenShareIcon from "@material-ui/icons/StopScreenShare";
import CallEndIcon from "@material-ui/icons/CallEnd";
import ChatIcon from "@material-ui/icons/Chat";
import Sidebar from "../src/components/Sidebar";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { message } from "antd";
import "antd/dist/antd.css";
import { Row } from "reactstrap";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";
import "./Video.css";
import { init } from "emailjs-com";
import emailkey from "./emailkey";
import { Mail } from "@material-ui/icons";
import Whiteboard from "./components/pages/Whiteboard/Whiteboard";
import { useReactMediaRecorder } from "react-media-recorder";
import { ReactMediaRecorder } from "react-media-recorder";
import Header from "./components/Header";
import $ from "jquery";
import db from "./components/pages/firebase";
import firebase from "firebase";
init("user_5CZ2p7y5NryVd84AQesAp");

const server_url =
  process.env.NODE_ENV === "production"
    ? "https://video.sebastienbiollo.com"
    : "http://localhost:4001";

var socket = null;
var socketId = null;
var elms = 0;

var connections = {};
const peerConnectionConfig = {
  iceServers: [
    // { 'urls': 'stun:stun.services.mozilla.com' },
    { urls: "stun:stun.l.google.com:19302" },
  ],
};

const getAllEvents = async () => {
  var site = window.location.href.toString();
  //http://localhost:3000/
  var site_length = site.length;

  var value = site.substring(site_length - 5, site_length);

  const query_snap = await db
    .collection("meetingLink")
    .where("meetingUrl", "==", value)
    .get();

  if (!query_snap.size) throw new Error("No meeting link found");

  // Meeting Document
  const meeting_link = query_snap.docs[0].data();
  return meeting_link;
};

//send email from meeting using emailjs
function sendEmail(e) {
  e.preventDefault();

  emailjs
    .sendForm(
      "default_service",
      "template_jy1y16p",
      e.target,
      "user_5CZ2p7y5NryVd84AQesAp"
    )
    .then(
      (result) => {
        alert(result.text);
      },
      (error) => {
        alert(error.text);
      }
    );
    document.getElementById("contact-form").style.display = "none";
}

//Recording

function showRecorder() {
  if (document.getElementById("recorder").style.display === "none") {
    document.getElementById("recorder").style.display = "block";
    const RecordView = () => {
      const { status, startRecording, stopRecording, mediaBlobUrl } =
        useReactMediaRecorder({ video: true });
    };
  } else document.getElementById("recorder").style.display = "none";
}
function imp_alert() {
  //alert("To start Screen Recording, select Share screen");
}

function clickStart() {
  setTimeout(function () {
    alert("Start button activates when Stop is pressed!");
  }, 2000);
  document.getElementById("startButton").style.visibility = "hidden";
}


function clickStop() {
  document.getElementById("startButton").style.visibility = "visible";
}

//whiteboard visibility function
function showWhiteboard() {
  if (
    document.getElementById("whiteboard-container").style.visibility ===
    "hidden"
  ) {
    document.getElementById("whiteboard-container").style.visibility =
      "visible";
    document.getElementById("whiteboard-container").style.width = "87vw";
    document.getElementById("whiteboard-container").style.height = "90vh";
  } else {
    document.getElementById("whiteboard-container").style.visibility = "hidden";
    document.getElementById("whiteboard-container").style.width = "0vw";
    document.getElementById("whiteboard-container").style.height = "0vh";
  }
}

//form to send email 
function showForm() {
  if (document.getElementById("main") != null) {
    if (document.getElementById("contact-form").style.display === "none")
      document.getElementById("contact-form").style.display = "block";
    else document.getElementById("contact-form").style.display = "none";
  }
}

class Video extends Component {
  constructor(props) {
    super(props);

    this.localVideoref = React.createRef();

    this.videoAvailable = false;
    this.audioAvailable = false;

    this.state = {
      video: false,
      audio: false,
      screen: false,
      showModal: false,
      screenAvailable: false,
      messages: [],
      message: "",
      newmessages: 0,
      askForUsername: true,
      username: faker.internet.userName(),
    };
    connections = {};

    this.getPermissions();
  }

  getPermissions = async () => {
    try {
      await navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => (this.videoAvailable = true))
        .catch(() => (this.videoAvailable = false));

      await navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => (this.audioAvailable = true))
        .catch(() => (this.audioAvailable = false));

      if (navigator.mediaDevices.getDisplayMedia) {
        this.setState({ screenAvailable: true });
      } else {
        this.setState({ screenAvailable: false });
      }

      if (this.videoAvailable || this.audioAvailable) {
        navigator.mediaDevices
          .getUserMedia({
            video: this.videoAvailable,
            audio: this.audioAvailable,
          })
          .then((stream) => {
            window.localStream = stream;
            this.localVideoref.current.srcObject = stream;
          })
          .then((stream) => {})
          .catch((e) => console.log(e));
      }
    } catch (e) {
      console.log(e);
    }
  };

  getMedia = () => {
    this.setState(
      {
        video: this.videoAvailable,
        audio: this.audioAvailable,
      },
      () => {
        this.getUserMedia();
        this.connectToSocketServer();
      }
    );
  };

  getUserMedia = () => {
    if (
      (this.state.video && this.videoAvailable) ||
      (this.state.audio && this.audioAvailable)
    ) {
      navigator.mediaDevices
        .getUserMedia({ video: this.state.video, audio: this.state.audio })
        .then(this.getUserMediaSuccess)
        .then((stream) => {})
        .catch((e) => console.log(e));
    } else {
      try {
        let tracks = this.localVideoref.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (e) {}
    }
  };

  getUserMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    this.localVideoref.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketId) continue;

      connections[id].addStream(window.localStream);

      connections[id].createOffer().then((description) => {
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socket.emit(
              "signal",
              id,
              JSON.stringify({ sdp: connections[id].localDescription })
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach(
      (track) =>
        (track.onended = () => {
          this.setState(
            {
              video: false,
              audio: false,
            },
            () => {
              try {
                let tracks = this.localVideoref.current.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
              } catch (e) {
                console.log(e);
              }

              let blackSilence = (...args) =>
                new MediaStream([this.black(...args), this.silence()]);
              window.localStream = blackSilence();
              this.localVideoref.current.srcObject = window.localStream;

              for (let id in connections) {
                connections[id].addStream(window.localStream);

                connections[id].createOffer().then((description) => {
                  connections[id]
                    .setLocalDescription(description)
                    .then(() => {
                      socket.emit(
                        "signal",
                        id,
                        JSON.stringify({
                          sdp: connections[id].localDescription,
                        })
                      );
                    })
                    .catch((e) => console.log(e));
                });
              }
            }
          );
        })
    );
  };

  getDislayMedia = () => {
    if (this.state.screen) {
      if (navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices
          .getDisplayMedia({ video: true, audio: true })
          .then(this.getDislayMediaSuccess)
          .then((stream) => {})
          .catch((e) => console.log(e));
      }
    }
  };

  getDislayMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    this.localVideoref.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketId) continue;

      connections[id].addStream(window.localStream);

      connections[id].createOffer().then((description) => {
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socket.emit(
              "signal",
              id,
              JSON.stringify({ sdp: connections[id].localDescription })
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach(
      (track) =>
        (track.onended = () => {
          this.setState(
            {
              screen: false,
            },
            () => {
              try {
                let tracks = this.localVideoref.current.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
              } catch (e) {
                console.log(e);
              }

              let blackSilence = (...args) =>
                new MediaStream([this.black(...args), this.silence()]);
              window.localStream = blackSilence();
              this.localVideoref.current.srcObject = window.localStream;

              this.getUserMedia();
            }
          );
        })
    );
  };

  gotMessageFromServer = (fromId, message) => {
    var signal = JSON.parse(message);

    if (fromId !== socketId) {
      if (signal.sdp) {
        connections[fromId]
          .setRemoteDescription(new RTCSessionDescription(signal.sdp))
          .then(() => {
            if (signal.sdp.type === "offer") {
              connections[fromId]
                .createAnswer()
                .then((description) => {
                  connections[fromId]
                    .setLocalDescription(description)
                    .then(() => {
                      socket.emit(
                        "signal",
                        fromId,
                        JSON.stringify({
                          sdp: connections[fromId].localDescription,
                        })
                      );
                    })
                    .catch((e) => console.log(e));
                })
                .catch((e) => console.log(e));
            }
          })
          .catch((e) => console.log(e));
      }

      if (signal.ice) {
        connections[fromId]
          .addIceCandidate(new RTCIceCandidate(signal.ice))
          .catch((e) => console.log(e));
      }
    }
  };

  changeCssVideos = (main) => {
    let widthMain = main.offsetWidth;
    let minWidth = "30%";
    if ((widthMain * 30) / 100 < 300) {
      minWidth = "300px";
    }
    let minHeight = "40%";

    let height = String(100 / elms) + "%";
    let width = "";
    if (elms === 0 || elms === 1) {
      width = "100%";
      height = "100%";
    } else if (elms === 2) {
      width = "45%";
      height = "100%";
    } else if (elms === 3 || elms === 4) {
      width = "35%";
      height = "50%";
    } else {
      width = String(100 / elms) + "%";
    }

    let videos = main.querySelectorAll("video");
    for (let a = 0; a < videos.length; ++a) {
      videos[a].style.minWidth = minWidth;
      videos[a].style.minHeight = minHeight;
      videos[a].style.setProperty("width", width);
      videos[a].style.setProperty("height", height);
    }

    return { minWidth, minHeight, width, height };
  };

  connectToSocketServer = () => {
    socket = io.connect(server_url, { secure: true });

    socket.on("signal", this.gotMessageFromServer);

    socket.on("connect", () => {
      socket.emit("join-call", window.location.href);
      socketId = socket.id;

      socket.on("chat-message", this.addMessage);

      socket.on("user-left", (id) => {
        let video = document.querySelector(`[data-socket="${id}"]`);
        if (video !== null) {
          elms--;
          video.parentNode.removeChild(video);

          let main = document.getElementById("main");
          this.changeCssVideos(main);
        }
      });

      socket.on("user-joined", (id, clients) => {
        clients.forEach((socketListId) => {
          connections[socketListId] = new RTCPeerConnection(
            peerConnectionConfig
          );
          // Wait for their ice candidate
          connections[socketListId].onicecandidate = function (event) {
            if (event.candidate != null) {
              socket.emit(
                "signal",
                socketListId,
                JSON.stringify({ ice: event.candidate })
              );
            }
          };

          // Wait for their video stream
          connections[socketListId].onaddstream = (event) => {
            // TODO mute button, full screen button
            var searchVidep = document.querySelector(
              `[data-socket="${socketListId}"]`
            );
            if (searchVidep !== null) {
              // if i don't do this check it make an empyt square
              searchVidep.srcObject = event.stream;
            } else {
              elms = clients.length;
              let main = document.getElementById("main");
              let cssMesure = this.changeCssVideos(main);

              let video = document.createElement("video");

              let css = {
                minWidth: cssMesure.minWidth,
                minHeight: cssMesure.minHeight,
                maxHeight: "100%",
                margin: "10px",
                borderStyle: "solid",
                borderColor: "#bdbdbd",
                objectFit: "fill",
              };
              for (let i in css) video.style[i] = css[i];

              video.style.setProperty("width", cssMesure.width);
              video.style.setProperty("height", cssMesure.height);
              video.setAttribute("data-socket", socketListId);
              video.srcObject = event.stream;
              video.autoplay = true;
              video.playsinline = true;

              main.appendChild(video);
            }
          };

          // Add the local video stream
          if (window.localStream !== undefined && window.localStream !== null) {
            connections[socketListId].addStream(window.localStream);
          } else {
            let blackSilence = (...args) =>
              new MediaStream([this.black(...args), this.silence()]);
            window.localStream = blackSilence();
            connections[socketListId].addStream(window.localStream);
          }
        });

        if (id === socketId) {
          for (let id2 in connections) {
            if (id2 === socketId) continue;

            try {
              connections[id2].addStream(window.localStream);
            } catch (e) {}

            connections[id2].createOffer().then((description) => {
              connections[id2]
                .setLocalDescription(description)
                .then(() => {
                  socket.emit(
                    "signal",
                    id2,
                    JSON.stringify({ sdp: connections[id2].localDescription })
                  );
                })
                .catch((e) => console.log(e));
            });
          }
        }
      });
    });
  };

  silence = () => {
    let ctx = new AudioContext();
    let oscillator = ctx.createOscillator();
    let dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    ctx.resume();
    return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
  };
  black = ({ width = 640, height = 480 } = {}) => {
    let canvas = Object.assign(document.createElement("canvas"), {
      width,
      height,
    });
    canvas.getContext("2d").fillRect(0, 0, width, height);
    let stream = canvas.captureStream();
    return Object.assign(stream.getVideoTracks()[0], { enabled: false });
  };

  handleVideo = () =>
    this.setState({ video: !this.state.video }, () => this.getUserMedia());
  handleAudio = () =>
    this.setState({ audio: !this.state.audio }, () => this.getUserMedia());
  handleScreen = () =>
    this.setState({ screen: !this.state.screen }, () => this.getDislayMedia());

  handleEndCall = () => {
    try {
      let tracks = this.localVideoref.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    } catch (e) {}
    window.location.href = "/";
  };

  openChat = () => this.setState({ showModal: true, newmessages: 0 });
  closeChat = () => this.setState({ showModal: false });
  handleMessage = (e) => this.setState({ message: e.target.value });

  addMessage = (data, sender, socketIdSender) => {
    this.setState((prevState) => ({
      messages: [...prevState.messages, { sender: sender, data: data }],
    }));
    if (socketIdSender !== socketId) {
      this.setState({ newmessages: this.state.newmessages + 1 });
    }
  };

  handleUsername = (e) => this.setState({ username: e.target.value });

  sendMessage = () => {

    socket.emit("chat-message", this.state.message, this.state.username);
    getAllEvents().then((meetingLink) => {
      var meeting_link_data = JSON.stringify(meetingLink);
      var length = meeting_link_data.length;

      for (var n = 0; n < length; n++) {
        if (meeting_link_data.charAt(n) === "f") var pos = n;
        var link = meeting_link_data.substring(pos, pos + 7);
        if (link === "fullUrl") {
          var roomId = meeting_link_data.substring(pos + 16, pos + 36);

          //Enter message in normal chat db
          db.collection("rooms").doc(roomId).collection("messages").add({
            message: this.state.message,
            name: this.state.username+" (in meeting)",

            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
          
          this.setState({ message: "", sender: this.state.username });
        break; 
          
        }
      }
    }
    );
  };

  //copy url function
  copyUrl = () => {
    let text = window.location.href;
    if (!navigator.clipboard) {
      let textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        message.success("Link copied to clipboard!");
      } catch (err) {
        message.error("Failed to copy");
      }
      document.body.removeChild(textArea);
      return;
    }
    navigator.clipboard.writeText(text).then(
      function () {
        message.success("Link copied to clipboard!");
      },
      () => {
        message.error("Failed to copy");
      }
    );
  };

  connect = () =>
    this.setState({ askForUsername: false }, () => this.getMedia());

  render() {
    return (
      <div>
        <Header />
        <div class="video_connect_page">
          <Sidebar />
          {/*<div id="rec-outer-circle">
                      <div id="rec-inner-circle">
                      </div>
          </div>*/}
          <div className="connect_page_container">
            {this.state.askForUsername === true ? (
              <div>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: "bold",
                      paddingRight: "50px",
                    }}
                  >
                    Set your username
                  </p>
                  <Input
                    placeholder="Username"
                    value={this.state.username}
                    onChange={(e) => this.handleUsername(e)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.connect}
                    style={{ margin: "20px" }}
                  >
                    Connect
                  </Button>
                </div>
                <div
                  style={{
                    justifyContent: "center",
                    textAlign: "center",
                    paddingTop: "20px",
                  }}
                >
                  <video
                    id="my-video"
                    ref={this.localVideoref}
                    autoPlay
                    muted
                    style={{
                      borderStyle: "solid",
                      borderColor: "#bdbdbd",
                      objectFit: "fill",
                      width: "40%",
                      height: "20%",
                    }}
                  ></video>
                </div>
              </div>
            ) : (
              <div>
                <div id="recorder" style={{ display: "none" }}>
                  <ReactMediaRecorder
                    render={({
                      status,
                      startRecording,
                      stopRecording,
                      mediaBlobUrl,
                    }) => (
                      <div>
                        <button
                          id="startButton"
                          onClick={() => {
                            imp_alert();
                            startRecording();
                            clickStart();
                          }}
                        >
                          Start Recording
                        </button>

                        <button
                          onClick={() => {
                            stopRecording();
                            clickStop();
                          }}
                        >
                          Stop Recording
                        </button>
                        <Input
                          type="text"
                          value={mediaBlobUrl}
                          placeholder="Recording URL"
                        />
                      </div>
                    )}
                  />
                </div>
                <div id="btn-down">
                  <IconButton
                    style={{ color: "#303146" }}
                    onClick={this.handleVideo}
                  >
                    {this.state.video === true ? (
                      <VideocamIcon style={{ fontSize: 32 }} />
                    ) : (
                      <VideocamOffIcon style={{ fontSize: 32 }} />
                    )}
                  </IconButton>

                  <IconButton
                    style={{ color: "#f44336" }}
                    onClick={this.handleEndCall}
                  >
                    <CallEndIcon style={{ fontSize: 32 }} />
                  </IconButton>

                  <IconButton
                    style={{ color: "#303146" }}
                    onClick={this.handleAudio}
                  >
                    {this.state.audio === true ? (
                      <MicIcon style={{ fontSize: 32 }} />
                    ) : (
                      <MicOffIcon style={{ fontSize: 32 }} />
                    )}
                  </IconButton>

                  {this.state.screenAvailable === true ? (
                    <IconButton
                      style={{ color: "#303146" }}
                      onClick={this.handleScreen}
                    >
                      {this.state.screen === true ? (
                        <ScreenShareIcon style={{ fontSize: 32 }} />
                      ) : (
                        <StopScreenShareIcon style={{ fontSize: 32 }} />
                      )}
                    </IconButton>
                  ) : null}

                  <Badge
                    badgeContent={this.state.newmessages}
                    max={999}
                    color="secondary"
                    onClick={this.openChat}
                  >
                    <IconButton
                      style={{ color: "#303146" }}
                      onClick={this.openChat}
                    >
                      <ChatIcon style={{ fontSize: 32 }} />
                    </IconButton>
                  </Badge>
                  <IconButton
                    style={{ color: "#303146", fontSize: "40" }}
                    onClick={showWhiteboard}
                  >
                    <BorderColorIcon />
                  </IconButton>
                  <Button onClick={showRecorder}>Record</Button>
                </div>

                <Modal
                  show={this.state.showModal}
                  onHide={this.closeChat}
                  style={{ zIndex: "999999" }}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Chat Room</Modal.Title>
                  </Modal.Header>
                  <Modal.Body
                    style={{
                      overflow: "auto",
                      overflowY: "auto",
                      height: "400px",
                      textAlign: "left",
                    }}
                  >
                    {this.state.messages.length > 0 ? (
                      this.state.messages.map((item, index) => (
                        <div key={index} style={{ textAlign: "left" }}>
                          <p style={{ wordBreak: "break-all" }}>
                            <b>{item.sender}</b>: {item.data}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p>No message yet</p>
                    )}
                  </Modal.Body>
                  <Modal.Footer className="div-send-msg">
                    <Input
                      placeholder="Message"
                      value={this.state.message}
                      onChange={(e) => this.handleMessage(e)}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.sendMessage}
                    >
                      Send
                    </Button>
                  </Modal.Footer>
                </Modal>

                <div style={{ marginTop: "3vh", marginLeft: "1vh" }}>
                  <div className="container">
                    <div className="connect-grid">
                      <div style={{ paddingTop: "10px" }}>
                        <Input
                          value={window.location.href}
                          disable="true"
                          id="link-holder"
                        ></Input>
                      </div>
                      <div>
                        <Button
                          id="copy_btn"
                          style={{
                            marginLeft: "1rem",
                            marginTop: "1vh",
                            width: "150px",
                            fontSize: "12px",
                            height: "5vh",
                          }}
                          onClick={this.copyUrl}
                        >
                          <FileCopyIcon style={{ fontSize: 20 }} />
                          Copy invite link
                        </Button>
                      </div>

                      <div
                        id="contact-mail-icon"
                        onClick={showForm}
                        style={{
                          marginTop: "1vh",
                          height: "5vh",
                          width: "15vw",
                        }}
                      >
                        <ContactMailIcon
                          style={{ fontSize: 28, marginTop: "0.6vh" }}
                        />{" "}
                        SEND LINK VIA EMAIL
                      </div>
                    </div>

                    {/*Send Form */}
                    <form
                      style={{ display: "none" }}
                      id="contact-form"
                      onSubmit={sendEmail}
                    >
                      <label id="label">From: </label>
                      <input
                        id="inputs"
                        type="text"
                        name="from_name"
                        value={this.state.username}
                        readOnly
                      />
                      <label id="label">Invitee: </label>
                      <input id="inputs" type="text" name="to_name" />
                      <label id="label">Email to: </label>
                      <input id="inputs" type="email" name="to_email" />
                      <label id="label">Link: </label>
                      <input
                        id="inputs"
                        name="link"
                        value={window.location.href}
                        readOnly
                      />
                      <input id="submit" type="submit" value="Send" />
                    </form>

                    <div
                      id="whiteboard-container"
                      style={{
                        visibility: "hidden",
                        width: "0vw",
                        height: "0vh",
                      }}
                    >
                      <Whiteboard />
                    </div>

                    <Row
                      id="main"
                      className="flex-container"
                      style={{ margin: 0, padding: 0 }}
                    >
                      <video
                        id="my-video"
                        ref={this.localVideoref}
                        autoPlay
                        muted
                        style={{
                          borderStyle: "solid",
                          borderColor: "#bdbdbd",
                          margin: "10px",
                          objectFit: "fill",
                          width: "100%",
                          height: "100%",
                        }}
                      ></video>
                    </Row>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Video;
