import React, { useState, useEffect } from "react";
import "./Conversation.css";
import PostAddIcon from "@material-ui/icons/PostAdd";
import db from "../pages/firebase";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

function search_bar() {
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();

  if(document.getElementById("conversation")!=null)
  {
  let x = document.getElementsByClassName("conversation");


  for (var i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = "block";
    }
  }
}
}

function Conversation({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");

  const [messages, setMessages] = useState("");
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="conversation" id="conversation">
        <div>
        <Avatar
          className="conversationImg"
          src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`}
          alt=""
        />
        </div>
        <div className="each-chat">
          <div className="conversationName" id="conversationName">
            {name}
          </div>
            <div id="lastConversation" className="lastConversation">{messages[0]?.message}</div>
        </div>
      </div>
    </Link>
  ) : (
    <div id="chat-grid" className="chat-grid">
      <input placeholder="Search for Chat Room" className="chatMenuInput" id=
      "searchbar" onKeyUp={search_bar}/>
      <div id="postAddIcon" className="postAddIcon" style={{cursor:"pointer"}}>
        <PostAddIcon onClick={createChat} style={{ fontSize: 36 }} />
      </div>
    </div>
  );
}

export default Conversation;
