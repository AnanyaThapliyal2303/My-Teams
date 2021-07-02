import React, { useState, useEffect, Component } from 'react'
import Scheduler from "./scheduler/Scheduler";
import Sidebar from "../Sidebar";
import Header from "../Header";
import db from "./firebase";
import "../css/SchedulerMain.css";



function SchedulerMain() {

const[events, setEvents] = useState([]);

useEffect(() => {
  db.collection('events').onSnapshot((snapshot) => 
          setEvents(snapshot.docs.map((doc) =>
              ({
                  id: doc.id,
                  data: doc.data(),
                  
     
              }))
              
      )

  );
},
 []);

 var start_date;

{events.map(event =>(
  start_date=event.data.start_date
 
))}

alert(JSON.stringify(db.collection("events")))


{/*{events.map(event =>(
const data=[{

   start_date:{event.data.start_date}
},
];
))}*/}


    return (
      <div>
        
        <Header />
        <div id="SchedulerMainPage">
          <Sidebar />
          <div className="scheduler-container">
            { events.map(event => (
            <Scheduler />))}

{events.map(event =>(
  <input value={event.data.start_date}/>
  ))}

           
          </div>
        </div>
      </div>
    );
  
}
export default SchedulerMain;
