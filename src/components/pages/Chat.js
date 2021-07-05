import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import "../css/Chat.css";
import ChatSidebar from "../Conversations/ChatSidebar";
import SendIcon from "@material-ui/icons/Send";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import "../Message/Message.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Picker from "emoji-picker-react";
import Header from "../Header";
import { Button,Input } from "@material-ui/core";
import db from "./firebase";
import firebase from "firebase";
import { Scrollbars } from 'react-custom-scrollbars';
import CancelIcon from '@material-ui/icons/Cancel';

import {useStateValue} from '../../StateProvider';

function openEmojis() {
  if (document.getElementById("emojiPicker").style.display === "none")
    document.getElementById("emojiPicker").style.display = "block";
  else document.getElementById("emojiPicker").style.display = "none";
}

function Chat() {
  const [input, setInput] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const {roomId} = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);

  const[{user}, dispatch] = useStateValue();

  useEffect(() => {
    if(roomId){
      db.collection('rooms')
      .doc(roomId)
      .onSnapshot((snapshot) => setRoomName
      (snapshot.data().name));
        
        db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => 
        setMessages(snapshot.docs.map((doc) => 
        doc.data()))
        );
    }
  }, [roomId]);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const EmojiData = ({ chosenEmoji }) =>
    document.getElementById("chatTextInput").value += (chosenEmoji.emoji);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setInput("");
  };

  function cancelAnalysisResult(){
    document.getElementById("analysis-result-div").style.display="none";
  }

  function showAnalysisResult(){
    document.getElementById("analysis-result-div").style.display="block";
  }


    //Implementing sentimental analysis for text input
  function Sentiment_Analysis() {
    var Sentiment = require("sentiment");
    var sentiment = new Sentiment();
    var text = document.getElementById("chatTextInput").value;
    var result = sentiment.analyze(text);
   if(result.score>0)
   var type= "Positive";
   if (result.score===0)
   var type= "Neutral";
   if(result.score<0)
   var type="Negative";
    document.getElementById("analysis-result").innerHTML = "<br/>Your message generated a score of: " + result.score  + "<br/>Your message is: "+type ;
  }

  return (
    <div id="chatBody">
      <Header />
      <div className="chat" id="chat">
        <Sidebar />
        <div className="chatMenu" id="chatMenu">
          <h2 id="chatMenuHeading">Chat</h2>
            <ChatSidebar/>
        </div>
        <div id="analysis-result-div">
            <CancelIcon id="cancelIcon" style={{fontSize:"20px"}} onClick={cancelAnalysisResult}/>
            <div id="analysis-result"></div>
        </div>
        <div className="chatBox" id="chatBox">
          <h3 className="userName" id="userName">
            {roomName}
          </h3>
          <div style={{ display: "none" }} id="emojiPicker">
            <Picker onEmojiClick={onEmojiClick} />
            <div style={{ display: "none" }}>
              {chosenEmoji && <EmojiData chosenEmoji={chosenEmoji} />}
            </div>
          </div>
        
          <div id="chatBoxWrapper">
            <div id="chatBoxBackground"></div>
            <div id="chatBoxTop">
              <div className="chatBoxBottom">
                <Input onChange={e => setInput(e.target.value)}
                  id="chatTextInput"
                  className="chatMessageInput"
                  placeholder="Type a new message"
                  value={input}
               />
                <SendIcon onClick={sendMessage}
                  className="sendIcon"
                  id="sendIcon"
                  style={{ fontSize: 30 }}
                />
                <div className="smallIcons" id="smallIcons">
                  <AttachFileIcon
                    className="attachFileIcon"
                    style={{ fontSize: 30 }}
                  />
                  <InsertEmoticonIcon
                    onClick={openEmojis}
                    className="insertEmoticonIcon"
                    style={{ fontSize: 30 }}
                  />
                  <MicIcon
                    className="micIcon"
                    id="micIcon"
                    style={{ fontSize: 30 }}
                  />

                  <Button id="analyze_btn" onClick={()=>{ Sentiment_Analysis(); showAnalysisResult();}}>
                    Run Analysis
                  </Button>
                </div>
              </div>
              
          <Scrollbars  autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}>
              <div id="messagesWrapper">
                {messages.map(message =>(
                        <div className={`message ${message.name ===user.displayName && `message_own`} `}>
                        <div className="messageTop" id="messageTop">
                          
                          <p className="messageText">
                          
                            <div id="messageFrom">
                              <span>~{message.name}</span>
                            </div>
                            <div id="main-message">
                            {message.message}
                            </div>
                            <div className="messageTime">{new Date(message.timestamp?.toDate())
                            .toString()}</div>
                          </p>
                          
                        </div>
                      </div>
                ))}
            
              </div>
              </Scrollbars>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
