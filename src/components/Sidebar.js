import React from 'react'
import './css/Sidebar.css'
import Sideitem from './Sideitem'
import GroupIcon from '@material-ui/icons/Group';
import ChatIcon from '@material-ui/icons/Chat';
import DateRangeIcon from '@material-ui/icons/DateRange';
import CallIcon from '@material-ui/icons/Call';
import AssignmentIcon from '@material-ui/icons/Assignment';


function Sidebar() {
    return (
        <div className="sidebar" id="sidebar">
                <Sideitem icon={<GroupIcon style={{ fontSize: 40 }}/>} icon_name="Teams"/>
                <Sideitem icon={<ChatIcon style={{ fontSize: 40 }}/>} icon_name="Chat"/>
                <Sideitem icon={<DateRangeIcon style={{ fontSize: 40 }}/>} icon_name="Calendar"/>
                <Sideitem icon={<CallIcon style={{ fontSize: 40 }}/>} icon_name="Call"/>
                <Sideitem icon={<AssignmentIcon style={{ fontSize: 40 }}/>} icon_name="Assignment"/>
        </div>
    )
}


export default Sidebar