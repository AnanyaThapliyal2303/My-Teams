import React, { useState, useEffect, Component } from 'react'
import Sidebar from "../Sidebar";
import Header from "../Header";
import db from "./firebase";
import "../css/SchedulerMain.css";
import firebase from './firebase';
import { useParams } from "react-router-dom";
import EventCard from './ScheduleEvents/EventCard';
import EventScheduler from './ScheduleEvents/EventScheduler';
import AddIcon from '@material-ui/icons/Add';

function showForm(){
	if(document.getElementById("event-form-div").style.display==="none")
		document.getElementById("event-form-div").style.display="block";
	else
		document.getElementById("event-form-div").style.display="none";
}


function SchedulerMain() {
	const { eventId } = useParams();
	const [events, setEvents] = useState([]);
  
	useEffect(() => {
	  db.collection("events")
		.orderBy("date", "asc")
		.onSnapshot((snapshot) => {
		  setEvents(
			snapshot.docs.map((doc) => {
			  return {
				id: doc.id,
				date: doc.data().date,
				title: doc.data().title,
				starttime: doc.data().starttime,
				endtime: doc.data().endtime,
				desc: doc.data().desc,
				creator: doc.data().creator,
			  };
			})
		  );
		});
	}, []);

	return(
		<div className="scheduler-main-div">
			<Header/>
			<div id="scheduler-page">
			<Sidebar/>
			<div id="scheduler-container">
				<button id="btn-eventadd" onClick={showForm}><AddIcon style={{fontSize:38, color:"white"}} /></button>
			<div>
				<EventScheduler/>
			</div>
			<div id="scheduler-card-grid">
			{events.map((event) => (
				<EventCard 
				id={event.id}
				title={event.title}
				desc={event.desc}
				date={event.date}
				starttime={event.starttime}
				endtime={event.endtime}
				creator={event.creator}
				/>	
			))}
			</div>
			</div>
			</div>
		</div>
	);
  
}
export default SchedulerMain;
