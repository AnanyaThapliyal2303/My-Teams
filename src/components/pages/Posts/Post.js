import React, { useState, useEffect, forwardRef } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import db from "../firebase";
import firebase from "firebase";
import ImageUpload from "./ImageUpload";
import FlipMove from "react-flip-move";
import { useStateValue } from "../../../StateProvider";
import EachPost from "./EachPost";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { Button } from "@material-ui/core";

function Post() {
  const [{ user }, dispatch] = useStateValue();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
      );
  }, []);

  //this function makes uploader div visible
  function uploadClick() {
    if(document.getElementById("imageupload").style.display==="none")
      document.getElementById("imageupload").style.display="block";
    else
      document.getElementById("imageupload").style.display="none";
  }

  return (
    <div class="area" id="area">
      <Header />
      <div id="postsPage">
        <Sidebar />
        <div id="postsContainer">
          <div  className="upload-image-div">
        <ImageUpload username={user.displayName} />
        </div>
        <div className="upload-btn-div">
            
  
              <Button className="btn-hover upload" onClick={uploadClick}>
              Click to UPLOAD
              </Button>
            </div>
        <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>

            <FlipMove>
              {posts.map(({ id, post }) => (
                <center>
                <EachPost
                  user={user}
                  key={id}
                  postId={id}
                  photo={post.photo}
                  username={post.username}
                  caption={post.caption}
                  imageUrl={post.imageUrl}
                />
               </center>
              ))}
                
            </FlipMove>
         
          
    
         


        </div>
        <div>
        
        </div>
      </div>
    </div>
  );
}

export default Post;
