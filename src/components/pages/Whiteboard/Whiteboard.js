import React from "react"
import './Whiteboard.css'
import {SketchField, Tools} from 'react-sketch';


    
class Whiteboard extends React.Component {

     render() {

        return (
           <div className="whiteboard_page">
              
            <SketchField className="whiteboard"
            id="whiteboard"
                        width='79vw' 
                         height='89vh' 
                         tool={Tools.Pencil} 
                         lineColor="black"
                         lineWidth={3}
                         />
          </div>
                        
      
        )
     }
}
 export default Whiteboard