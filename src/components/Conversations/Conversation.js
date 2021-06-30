import React from 'react'
import "./Conversation.css"

function Conversation() {
    return (
        <div className="conversation" id="conversation">
            <img className="conversationImg" src="https://ichef.bbci.co.uk/news/976/cpsprodpb/692A/production/_112922962_apple.jpg" alt=""/>
            <div className="each-chat">
            <div className="conversationName" id="conversationName">Apple</div>
            <div id="lastConversation">Earth is the third planet</div>
            </div>
        </div>
    )
}

export default Conversation
