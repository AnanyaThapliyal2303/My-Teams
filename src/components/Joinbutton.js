//This file is not used yet...kept for future use

import React from 'react'
import './css/Joinbutton.css'
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import {Button} from '@material-ui/core';

function Joinbutton() {
    return (
        <div>
        <Button class="joinbutton">
          <GroupAddIcon  style={{fontSize: 24}} className="joinbuttonicon"/>
          Join or create team
        </Button>
        </div>
    )
}

export default Joinbutton
