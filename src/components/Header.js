import React, {useState}  from 'react'
import './css/Header.css'
import Searchbar from './Searchbar'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Light from './img/Light.png';
import Dark from './img/Dark.png';
import DarkMode from './modes/DarkMode';
import LightMode from './modes/LightMode';
import DarkModeToggle from "react-dark-mode-toggle";
import { colors } from '@material-ui/core';

{/*function openMore(){
    if(document.getElementById("theme").style.display==="none")
    document.getElementById("theme").style.display="block";
    else 
    document.getElementById("theme").style.display="none";
        
} */}

function Header() {
    const [isDarkMode, setDarkMode] = useState(() => null);
     if(isDarkMode!=null)
     isDarkMode? DarkMode():LightMode();

    return (

        <div>
        <div className="header-grid" id="header-grid">
            <div className="heading">
                
                Microsoft Teams
                </div>
                <Searchbar/>
                <div className="profile">
                    <div id="toggleDiv" className="toggleDiv" >
                        <DarkModeToggle onChange={setDarkMode} checked={isDarkMode} size={44} className="toggleButton"/>
                    </div>
                    <AccountCircleIcon  style={{ fontSize: 40, marginTop:"0.5rem" }} />
                </div>
        </div>
          {/*  <div id="theme" className="theme-grid">
                <img id="light" src={Light} alt="" onClick={LightMode}/>
                <img id="dark" src={Dark} alt="" onClick={DarkMode}/> 
    </div> */}
</div>   
    )
}

export default Header
