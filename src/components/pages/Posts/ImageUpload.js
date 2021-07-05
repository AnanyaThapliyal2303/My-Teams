import React, {useState} from 'react';
import {Input, Button} from "@material-ui/core";
import {storage} from "../firebase"
import firebase from 'firebase';
import db from "../firebase";
import './ImageUpload.css';
import {useStateValue} from '../../../StateProvider';

function ImageUpload({username}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress]=useState(0);
    const [caption, setCaption]=useState('');
    const[{user}, dispatch] = useStateValue();

    const handleChange = (e) =>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };
    
const handleUpload =()=>{
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
        "state_changed",
        (snapshot)=>{
            //progress function...
            const progress = Math.round(
                (snapshot.bytesTransferred/snapshot.totalBytes)*100
            );
            setProgress(progress);
        },
        (error)=>{
            //error function...
            console.log(error);
            alert(error.message);
        },
        ()=> {
            //complete function...
            storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url=>{
                //post image inside db
                db.collection("posts").add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    caption: caption,
                    imageUrl: url,
                    username: user.displayName,
                    photo: user.photoURL
                });

                setProgress(0);
                setCaption("");
                setImage(null);
            });
        }
    );
};

    return (
        <div id="main-upload-div">
        <div id="imageupload" className="imageupload" style={{display:"none"}}>
            <progress className="imageupload__progress" value={progress} max="100" />
            <div id="caption-upload">
            <input id="caption-input" type="text" placeholder='Enter a caption...' onChange={event => setCaption(event.target.value)} value={caption}/>
            <input type="file" onChange={handleChange} />

            <Button id="actual-upload-btn" onClick={handleUpload}>
                Upload
            </Button>
            </div>
        </div>
        </div>
    )
}

export default ImageUpload;