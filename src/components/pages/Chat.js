import React from 'react'
import Sidebar from '../Sidebar'
import '../css/Chat.css'
import Conversation from '../Conversations/Conversation'
import PostAddIcon from '@material-ui/icons/PostAdd';
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import Message from '../Message/Message'
import { useState } from 'react';
import Picker from 'emoji-picker-react';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

function openEmojis(){
    if(document.getElementById("emojiPicker").style.display==="none")
    document.getElementById("emojiPicker").style.display="block";
    else 
    document.getElementById("emojiPicker").style.display="none";
        
}


function Chat() {
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
      setChosenEmoji(emojiObject);
      if(chosenEmoji)
        {
          document.getElementById("chatTextInput").value+= chosenEmoji.emoji;
        }
        
    };
  
    return (
        <div id="chatBody">
            {/*<Sidebar />*/}
            <div className="chat" id="chat">
            <Sidebar/>
                <div className="chatMenu" id="chatMenu">
                    <h2 id="chatMenuHeading">Chat</h2>
                    <div id="chatMenuWrapper" 
                    className="chatMenuWrapper" style={{height:"83.5vh"}}>
                        <div id="chat-grid" className="chat-grid">
                            <input placeholder="Search for people" className="chatMenuInput" />
                            <div id="postAddIcon" className="postAddIcon">
                            <PostAddIcon style={{ fontSize: 36 }}/>  
                            </div> 
                        </div>
                        <Conversation />
                    </div>
                </div>
                <div className="chatBox" id="chatBox">
                    <h3 className="userName" id="userName">Apple</h3>
                    <div id="emojiPicker">
                    <Picker onEmojiClick={onEmojiClick} />
                    </div>
          
                <div id="chatBoxWrapper"   >
                <div id="chatBoxBackground" ></div>
                    <div id="chatBoxTop">
                    
                    <div className="chatBoxBottom">
                        
                        <textarea id="chatTextInput" className="chatMessageInput" placeholder="Type a new message"></textarea>
                        <SendIcon className="sendIcon" id="sendIcon" style={{ fontSize: 30 }}/>
                          <div className="smallIcons" id="smallIcons">
                               <AttachFileIcon className="attachFileIcon" style={{ fontSize: 30 }}/>
                               <InsertEmoticonIcon onClick={openEmojis} className="insertEmoticonIcon" style={{ fontSize: 30 }}/>
                               <MicIcon className="micIcon" id="micIcon" style={{ fontSize: 30 }}/>
                          </div>
                    </div>
                    
                    <div id="messagesWrapper">
                        <Message />
                        <Message own={true}/>
                        <Message />
                        <Message />
                        <Message own={true}/>
                        <Message />
                    </div>    
                    </div>
                  
                </div>
                </div>
            </div>
        </div>
    )
}

export default Chat
