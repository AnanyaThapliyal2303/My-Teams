import React from 'react'
import './css/Sidebar.css'
import Sideitem from './Sideitem'
import GroupIcon from '@material-ui/icons/Group';
import ChatIcon from '@material-ui/icons/Chat';
import DateRangeIcon from '@material-ui/icons/DateRange';
import CallIcon from '@material-ui/icons/Call';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Router,Link } from 'react-router-dom';


function Sidebar() {
    return (
        <div className="sidebar" id="sidebar">
         
                <Sideitem icon={<GroupIcon style={{ fontSize: 40 }}/>} icon_name="Teams"/>
            <Link to ="/chat">
                <Sideitem icon={<ChatIcon style={{ fontSize: 40 }}/>} icon_name="Chat"/>
            </Link>
            <Link to ="/schedule">
                <Sideitem icon={<DateRangeIcon style={{ fontSize: 40 }}/>} icon_name="Calendar"/>
            </Link>   
            <Link to ="/">
                <Sideitem icon={<CallIcon style={{ fontSize: 40 }}/>} icon_name="Call"/>
            </Link>

                <Sideitem icon={<AssignmentIcon style={{ fontSize: 40 }}/>} icon_name="Assignment"/>
                
        </div>
    )
}


export default Sidebar