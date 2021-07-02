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

{
  /*function openMore(){
    if(document.getElementById("theme").style.display==="none")
    document.getElementById("theme").style.display="block";
    else 
    document.getElementById("theme").style.display="none";
        
} */
}

function Header() {
  const [isDarkMode, setDarkMode] = useState(() => null);
  if (isDarkMode != null) isDarkMode ? DarkMode() : LightMode();

    const[{user}, dispatch] = useStateValue();

  return (
    <div>
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
          <div id="profile_div">
            <img id="profile_icon" src={user?.photoURL} alt=""></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
