import React, { useState, useEffect } from 'react'
import Conversation from './Conversation'
import db from "../pages/firebase"
import { Unsubscribe } from '@material-ui/icons';
import { useStateValue } from '../../StateProvider';
import './Conversation.css';

function ChatSidebar() {

    const[rooms,setRooms] = useState([]);
    const[{user}, dispatch] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => 
                setRooms(snapshot.docs.map((doc) =>
                    ({
                        id: doc.id,
                        data: doc.data(),
                    }))
            )
        );

        return() => {
            unsubscribe();
        }
    }, []);


    
    return (
        <div>
            
              <div
            id="chatMenuWrapper"
            className="chatMenuWrapper"
            
          >
            
          
            <Conversation addNewChat/>

                {rooms.map(room => (
                   
                    <Conversation key={room.id} id={room.id}
                    name={room.data.name} dp={user?.photoURL}/>
                    
                ))}

                
          </div>
        
        </div>
    )
}

export default ChatSidebar
