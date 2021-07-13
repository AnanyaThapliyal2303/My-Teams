import React from "react";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import db from "../firebase";

//function to delete an event
const deleteEvent = (id) => {
    db.collection("events")
      .doc(id)
      .delete()
      .then((res) => {
        console.log("Deleted!", res);
      });
  };

function EventCard(props) {
  return (
    <div id="event-card">
        <div id="title-heading">
         {props.title}<DeleteForeverIcon style={{fontSize:30,marginLeft:"1vw"}} id="deleteIcon" onClick={() => deleteEvent(props.id)}/>
        <div/>
        </div>
      <p style={{marginLeft:"2vw",marginTop:"2vh"}}>
        <div> Date: {props.date}</div>
        <div>
          Time: {props.starttime} - {props.endtime}
        </div>
        <div>Event created by: {props.creator}</div>
       <div id='description-title'>Description:</div>
      <p> {props.desc}</p>
      </p>
      
    
    </div>
  );
}

export default EventCard;
