import React, { useState } from "react";
import "./css/Header.css";
import Searchbar from "./Searchbar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DarkMode from "./modes/DarkMode";
import LightMode from "./modes/LightMode";
import DarkModeToggle from "react-dark-mode-toggle";
import { colors } from "@material-ui/core";
import {useStateValue} from '../StateProvider';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

//logout function to exit the app
function Logout(){
  window.location.replace("https://my-teams-172e9.web.app/");
}

//shows logout button on click
function profileClick() {
  if(document.getElementById("logout").style.display==="none")
    document.getElementById("logout").style.display="block";
  else
    document.getElementById("logout").style.display="none";
}

function Header() {
  const [isDarkMode, setDarkMode] = useState(() => null);
  if (isDarkMode != null) isDarkMode ? DarkMode() : LightMode();

    const[{user}, dispatch] = useStateValue();

  return (
    <div id="whole-header">
      <div className="header-grid" id="header-grid">
        <div className="heading">My Teams</div>
        <div style={{ width: "10vw" }}>
          <Searchbar />
        </div>
        <div className="profile" style={{ marginLeft: "15rem", width: "8rem" }}>
          <div id="toggleDiv" className="toggleDiv">
            <DarkModeToggle
              onChange={setDarkMode}
              checked={isDarkMode}
              size={44}
              className="toggleButton"
            />
          </div>
          <div id="profile_div"  onClick={profileClick}>
            <img id="profile_icon" src={user?.photoURL} alt="" style={{cursor:"pointer"}}></img>
          </div>
        </div>
      </div>
      <div id="logout"  onClick={Logout} style={{display: "none"}}>
      <PowerSettingsNewIcon />Logout
      </div>
    </div>
  );
}

export default Header;
