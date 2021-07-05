import React from "react";
import "./css/Sidebar.css";
import Sideitem from "./Sideitem";
import GroupIcon from "@material-ui/icons/Group";
import ChatIcon from "@material-ui/icons/Chat";
import DateRangeIcon from "@material-ui/icons/DateRange";
import CallIcon from "@material-ui/icons/Call";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Router, Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar" id="sidebar">
      <Link to="/home">
        <Sideitem
          icon={<CallIcon style={{ fontSize: 40 }} />}
          icon_name="Call"
        />
      </Link>

      <Link to="/social">
      <Sideitem
        icon={<GroupIcon style={{ fontSize: 40 }} />}
        icon_name="Social"
      />
      </Link>

      <Link to="/chat">
        <Sideitem
          icon={<ChatIcon style={{ fontSize: 40 }} />}
          icon_name="Chat"
        />
      </Link>

      <Link to="/schedule">
        <Sideitem
          icon={<DateRangeIcon style={{ fontSize: 40 }} />}
          icon_name="Calendar"
        />
      </Link>

      <Sideitem
        icon={<AssignmentIcon style={{ fontSize: 40 }} />}
        icon_name="To-Do"
      />
    </div>
  );
}

export default Sidebar;
