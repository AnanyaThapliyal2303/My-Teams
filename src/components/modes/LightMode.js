import React from 'react'

function LightMode() {
  document.getElementById("header-grid").style.backgroundColor="#464775";
  document.getElementById("sidebar").style.backgroundColor="#303146";
  document.getElementById("searchBar").style.backgroundColor= "#464775";
  document.getElementById("searchBar").style.color="white";

  if(document.getElementById("chatBody")!=null)
  {
  document.getElementById("chatMenu").style.backgroundColor="#f0f0f0";
  document.getElementById("chatMenuHeading").style.color="black";
  document.getElementById("userName").style.color="black";
  document.getElementById("conversationName").style.color="black";
  document.getElementById("conversation").style.color="black";
  document.getElementById("conversation").style.backgroundColor="rgba(99, 99, 99, 0)";
  document.getElementById("chatBox").style.backgroundColor="#f0f0f0";
  document.getElementById("sendIcon").style.backgroundColor="#f0f0f0";
  document.getElementById("chatTextInput").style.backgroundColor="white";
  document.getElementById("chatTextInput").style.color="black";
  document.getElementById("chatTextInput").style.borderBottom="solid 2.5px #6264a7";
  document.getElementById("userName").style.borderBottom="solid 0.5px rgb(209, 208, 208)";
  document.getElementById("chatMenuHeading").style.borderBottom="solid 1px rgb(185, 184, 184)";
  document.getElementById("chatMenuHeading").style.backgroundColor="#f0f0f0;";
  document.getElementById("chatBoxWrapper").style.backgroundColor="#f0f0f0";
  document.getElementById("smallIcons").style.backgroundColor="#f0f0f0";
  document.getElementById("smallIcons").style.color="rgb(95, 95, 95)";
  document.getElementById("messagesWrapper").style.backgroundColor="#f0f0f0";
  document.getElementById("chatMenu").style.backgroundColor=" #f0f0f0";
  document.getElementById("chatBoxBackground").style.backgroundColor="#f0f0f0";
  document.getElementById("chatMenuWrapper").style.backgroundColor=" #f0f0f0";
  document.getElementById("chat-grid").style.backgroundColor=" #f0f0f0";
  document.getElementById("postAddIcon").style.color="black";
  document.getElementById("chatBoxTop").style.backgroundColor="#f0f0f0";
  document.getElementById("lastConversation").style.color="black";
  document.getElementById("conversationName").style.color="black";

  let y = document.getElementsByClassName("conversationName");
  for (var j = 0; j < y.length; j++) {
      y[j].style.color = "black";
      }

  let x = document.getElementsByClassName("lastConversation");
  for (var i = 0; i < x.length; i++) {
      x[i].style.color = "black";
      }

  let z = document.getElementsByClassName("conversation");
  for (var k = 0; k < z.length; k++) {
      z[k].style.color = "black";
      }

  }

  if(document.getElementById("callPage")!=null)
  {
    document.getElementById("callPage").style.backgroundColor="#f2f2f7";
    document.getElementById("text1").style.color="black";
    document.getElementById("text2").style.color="black";
    document.getElementById("text3").style.color="black";
    document.getElementById("input_url").style.color="rgb(43, 42, 42)";
}

if(document.getElementById("area")!=null){
  document.getElementById("area").style.backgroundColor="#dadae3";
}

}

export default LightMode
