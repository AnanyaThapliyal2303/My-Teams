import React, { useState, useEffect, Component } from 'react'
import Scheduler from "./scheduler/Scheduler";
import Sidebar from "../Sidebar";
import Header from "../Header";
import db from "./firebase";
import "../css/SchedulerMain.css";
import firebase from './firebase';



function SchedulerMain() {



const getAllEvents = async ()=>{
	//  Create reference to the collection
	const events_collection_ref = db.collection('events');

	// Fetch all events from the collection
	const query_snaps = await events_collection_ref.get();
	
	// Initilaise variable to return
	const return_data = {};

	// Check size of snaps
	// - IF 0 => No events available;
	if (!query_snaps.size) return return_data;

	// iterate through all documents of in the response;
	// snap => snapshot of document
	for(const snap of query_snaps.docs){
		const document_id = snap.id;
		const document = snap.data();

		return return_data[document_id]=document;
	}

	return return_data;
}


    return (
      <div>
        
        <Header />
        <div id="SchedulerMainPage">
          <Sidebar />
          <div className="scheduler-container">
           
          <Scheduler events={getAllEvents}/>
           
          </div>
        </div>
      </div>
    );
  
}
export default SchedulerMain;
