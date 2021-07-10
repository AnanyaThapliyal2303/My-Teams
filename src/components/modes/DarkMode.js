import React from 'react'

function DarkMode() {
  document.getElementById("sidebar").style.backgroundColor="black";
  document.getElementById("header-grid").style.backgroundColor="#474646";
  document.getElementById("searchBar").style.backgroundColor= "#474646";
  document.getElementById("searchBar").style.color="white";

  if(document.getElementById("chatBody")!=null)
  {
  document.getElementById("chatBody").style.backgroundColor="#141414";
  document.getElementById("chatMenu").style.backgroundColor="#141414";
  document.getElementById("chatMenuHeading").style.color="white";
  document.getElementById("userName").style.color="white";
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
  document.getElementById("messagesWrapper").style.backgroundColor="#1f1f1f";
  document.getElementById("chatMenuWrapper").style.backgroundColor=" #141414";
  document.getElementById("postAddIcon").style.color=" white";
  document.getElementById("chat-grid").style.backgroundColor="#141414";
  document.getElementById("chatBoxBackground").style.backgroundColor="#1f1f1f";
  document.getElementById("chatBoxTop").style.backgroundColor="#1f1f1f";
 
  document.getElementById("chat").style.backgroundColor="#141414";  
    let y = document.getElementsByClassName("conversationName");
    for (var j = 0; j < y.length; j++) {
        y[j].style.color = "white";
        y[j].style.backgroundColor = "rgba(99, 99, 99, 0)";
      }

    let x = document.getElementsByClassName("lastConversation");
    for (var i = 0; i < x.length; i++) {
        x[i].style.color = "white";
        x[i].style.backgroundColor = "rgba(99, 99, 99, 0)";
      }

    let z = document.getElementsByClassName("conversation");
    for (var k = 0; k < z.length; k++) {
        z[k].style.backgroundColor = "rgba(99, 99, 99, 0)";
        }

    
  document.getElementById("chatBoxBackground").style.backgroundColor="#1f1f1f";  
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
    document.getElementById("input_url").style.color="white";

  }

  if(document.getElementById("area")!=null){
    document.getElementById("area").style.backgroundColor="#252525";
  }
  
}

export default DarkMode
