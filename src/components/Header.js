import React from 'react'
import './css/Header.css'
import Searchbar from './Searchbar'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Light from './img/Light.png';
import Dark from './img/Dark.png';
import DarkMode from './modes/DarkMode';
import LightMode from './modes/LightMode';

function openMore(){
    if(document.getElementById("theme").style.display==="none")
    document.getElementById("theme").style.display="block";
    else 
    document.getElementById("theme").style.display="none";
        
}


function Header() {
    return (
        <div>
        <div className="header-grid" id="header-grid">
            <div className="heading">
                
                Microsoft Teams
                </div>
                <Searchbar/>
                <div className="profile">
                    <MoreHorizIcon style={{ fontSize: 36 }} className="more" id="more" onClick={openMore}/>
                    <AccountCircleIcon  style={{ fontSize: 36 }} />
                </div>
              
        </div>
            <div id="theme" className="theme-grid">
                <img src={Light} alt="" onClick={LightMode}/>
                <img src={Dark} alt="" onClick={DarkMode}/> 
            </div>
</div>   
    )
}

export default Header
