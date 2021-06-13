import React from 'react'
import './css/Sideitem.css'

function Sideitem(props) {
    return (
        <div class="eachitem">
       
            {props.icon}
           
            <div class="item_name">
            {props.icon_name}
            </div>
          
        </div>
    )
}

export default Sideitem