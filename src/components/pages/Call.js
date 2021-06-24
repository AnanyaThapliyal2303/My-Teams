import React from 'react'
import '../css/Call.css'
import Sidebar from '../Sidebar';
import VideocamIcon from '@material-ui/icons/Videocam';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EventIcon from '@material-ui/icons/Event';
import{
    Link,
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Home from '../VideoMeeting/src/Home'
import Video from '../VideoMeeting/src/Video'

function Call() {
    return (

       
        <div className="call_class" id="callPage">
            <Router>
                <Switch>
<Route exact path="/video" >render={() => {window.location.href="../VideoMeeting/public/index.html"}}
</Route> 

</Switch>
</Router>


            <Sidebar/>
            <div className="call_options_grid">

                
                <div id="videoIcon" className="videoIcon">
              <Link to="/video"><VideocamIcon style={{fontSize:200, color:"white", marginBottom:"0rem"}} className="hvr-bob"/>
              </Link> 
                <p id="text1">New Meeting</p>
                </div>
                <div id="addIcon" className="addIcon">
                    <AddBoxIcon style={{fontSize:200, color:"white", marginBottom:"0rem"}} className="hvr-bob"/>
                    <p id="text2">Join</p>
                </div>
                <div id="eventIcon" className="eventIcon">
                    <EventIcon style={{fontSize:200, color:"white", marginBottom:"0rem"}} className="hvr-bob"/>
                    <p id="text3">Schedule</p>
                </div>
            </div>
        </div>
    )
}

export default Call
