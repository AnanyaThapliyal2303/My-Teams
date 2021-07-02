import React, {useState, useEffect} from 'react'
import "./Conversation.css"
import PostAddIcon from "@material-ui/icons/PostAdd";
import db from '../pages/firebase';
import Avatar from '@material-ui/core/Avatar';

import {Link} from "react-router-dom";

function Conversation({id, name, addNewChat}) {

  const[seed, setSeed] = useState("");

  const [messages,setMessages]=useState("");
  useEffect(()=>{
    if(id){
    db.collection("rooms")
    .doc(id)
    .collection("messages")
    .orderBy("timestamp","desc")
    .onSnapshot((snapshot) =>
     setMessages(snapshot.docs.map((doc) =>
     doc.data()))
    );
  }
},[id]);

    const createChat = () => {
        const roomName = prompt("Please enter name for chat");
        if(roomName){
            db.collection("rooms").add({
              name: roomName,
            });
        }
    };

    useEffect(() => {
      setSeed(Math.floor(Math.random()*5000));
  }, []);

    return !addNewChat ? (
      <Link to={`/rooms/${id}`}>
        <div className="conversation" id="conversation">
            <Avatar className="conversationImg" 
            src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} 
            alt=""/>
            <div className="each-chat">
            <div className="conversationName" id="conversationName">{name}</div>
            <div id="lastConversation">{messages[0]?.message}</div>
            </div>
        </div>
      </Link>
        
    ): (
        <div id="chat-grid" className="chat-grid">
        <input
          placeholder="Search for people"
          className="chatMenuInput"
        />
        <div id="postAddIcon" className="postAddIcon">
          <PostAddIcon onClick={createChat} style={{ fontSize: 36 }} />
        </div>
      </div>
    );
}

export default Conversation
