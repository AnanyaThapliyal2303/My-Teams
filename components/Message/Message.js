import React from 'react'
import "./Message.css"

function Message({own}) {
    return (
        <div className={own ? "message own" : "message"}>
            
            <div className="messageTop" id="messageTop">
                <img className="messageImg" src="https://ichef.bbci.co.uk/news/976/cpsprodpb/692A/production/_112922962_apple.jpg" alt=""/>
                <p className="messageText">
                    <div className="messageTime">
                    5/24 12:24 PM 
                    </div>
                    Earth is the third planet from the Sun and the only astronomical object known to harbor and support life. 
                    About 29.2% of Earth's surface is land consisting of continents and islands. 
                    The remaining 70.8% is covered with water, mostly by oceans, seas, gulfs, and other salt-water bodies, 
                    but also by lakes, rivers, and other freshwater, which together constitute the hydrosphere. 
                </p>
            </div>
        
        </div>
    )
}

export default Message
