import React from 'react'

function DarkMode() {
  document.getElementById("sidebar").style.backgroundColor="black";
  document.getElementById("header-grid").style.backgroundColor="#474646";
  document.getElementById("searchBar").style.backgroundColor= "#474646";
  document.getElementById("searchBar").style.color="white";

  if(document.getElementById("chatBody")!=null)
  {
  document.getElementById("chatMenu").style.backgroundColor="#141414";
  document.getElementById("chatMenuHeading").style.color="white";
  document.getElementById("userName").style.color="white";
  document.getElementById("conversationName").style.color="white";
  document.getElementById("conversation").style.color="white";
  document.getElementById("conversation").style.backgroundColor="rgba(99, 99, 99, 0)";
  document.getElementById("chatBox").style.backgroundColor="#1f1f1f";
  document.getElementById("sendIcon").style.backgroundColor="#1f1f1f";
  document.getElementById("chatTextInput").style.backgroundColor="#292929";
  document.getElementById("chatTextInput").style.color="white";
  document.getElementById("chatTextInput").style.borderBottom="solid 2px #9ea2ff";
  document.getElementById("userName").style.borderBottom="solid 1.5px  #0a0a0a";
  document.getElementById("chatMenuHeading").style.borderBottom=" solid 1.5px #000000 ";
  document.getElementById("chatBoxWrapper").style.backgroundColor="#1f1f1f";
  document.getElementById("smallIcons").style.backgroundColor="#1f1f1f";
  document.getElementById("smallIcons").style.color="white";
  document.getElementById("chatBoxBackground").style.backgroundColor="#1f1f1f";
  document.getElementById("messagesWrapper").style.backgroundColor="#1f1f1f";
  document.getElementById("chatMenuWrapper").style.backgroundColor=" #141414";
  document.getElementById("chatMenu").style.backgroundColor="#141414";
  document.getElementById("postAddIcon").style.color=" white";
  document.getElementById("chat-grid").style.backgroundColor="#141414";
  document.getElementById("chatBoxBackground").style.backgroundColor="#1f1f1f";
  document.getElementById("chatBoxTop").style.backgroundColor="#1f1f1f";
  }
  
  if(document.getElementById("callPage")!=null)
  {
    document.getElementById("callPage").style.backgroundColor="#252525";
    document.getElementById("text1").style.color="white";
    document.getElementById("text2").style.color="white";
    document.getElementById("text3").style.color="white";
    document.getElementById("videoIcon").style.boxShadow="none";
    document.getElementById("addIcon").style.boxShadow="none";
    document.getElementById("eventIcon").style.boxShadow="none";
    document.getElementById("videoIcon").style.backgroundColor="#8a8686";
    document.getElementById("addIcon").style.backgroundColor="#8a8686";
    document.getElementById("eventIcon").style.backgroundColor="#8a8686";
  }
  
  
}

export default DarkMode
