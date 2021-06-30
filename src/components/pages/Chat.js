import React from "react";
import Sidebar from "../Sidebar";
import "../css/Chat.css";
import Conversation from "../Conversations/Conversation";
import PostAddIcon from "@material-ui/icons/PostAdd";
import SendIcon from "@material-ui/icons/Send";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import "../Message/Message.css";
import { useState } from "react";
import Picker from "emoji-picker-react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Header from "../Header";
import { Button,Input } from "@material-ui/core";
function openEmojis() {
  if (document.getElementById("emojiPicker").style.display === "none")
    document.getElementById("emojiPicker").style.display = "block";
  else document.getElementById("emojiPicker").style.display = "none";
}

function Chat() {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const EmojiData = ({ chosenEmoji }) =>
    (document.getElementById("chatTextInput").value += chosenEmoji.emoji);


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
    alert("Your message generated a score of: " + result.score+"\nYour message is: "+type );
  }

  return (
    <div id="chatBody">
      <Header />
      <div className="chat" id="chat">
        <Sidebar />
        <div className="chatMenu" id="chatMenu">
          <h2 id="chatMenuHeading">Chat</h2>
          <div
            id="chatMenuWrapper"
            className="chatMenuWrapper"
            style={{ height: "83.5vh" }}
          >
            <div id="chat-grid" className="chat-grid">
              <input
                placeholder="Search for people"
                className="chatMenuInput"
              />
              <div id="postAddIcon" className="postAddIcon">
                <PostAddIcon style={{ fontSize: 36 }} />
              </div>
            </div>
            <Conversation />
          </div>
        </div>
        <div className="chatBox" id="chatBox">
          <h3 className="userName" id="userName">
            Apple
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
                <Input
                  id="chatTextInput"
                  className="chatMessageInput"
                  placeholder="Type a new message"
               />
                <SendIcon
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

                  <Button id="analyze_btn" onClick={Sentiment_Analysis}>
                    Run Analysis
                  </Button>
                </div>
              </div>

              <div id="messagesWrapper">
                <div className={`message ${true && `message_own`} `}>
                  <div className="messageTop" id="messageTop">
                    <img
                      className="messageImg"
                      src="https://ichef.bbci.co.uk/news/976/cpsprodpb/692A/production/_112922962_apple.jpg"
                    />

                    <p className="messageText">
                      <div className="messageTime">5/24 12:24 PM</div>
                      Earth is the third planet from the Sun and the only
                      astronomical object known to harbor and support life.
                      About 29.2% of Earth's surface is land consisting of
                      continents and islands. The remaining 70.8% is covered
                      with water, mostly by oceans, seas, gulfs, and other
                      salt-water bodies, but also by lakes, rivers, and other
                      freshwater, which together constitute the hydrosphere.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
