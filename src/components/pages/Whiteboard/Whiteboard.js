import React from "react"
import './Whiteboard.css'
import {SketchField, Tools} from 'react-sketch';

class Whiteboard extends React.Component {
     render() {
        return (
            <SketchField className="whiteboard"
                        width='86vw' 
                         height='90vh' 
                         tool={Tools.Pencil} 
                         lineColor='black'
                         lineWidth={3}
                         />
        )
     }
}
 export default Whiteboard