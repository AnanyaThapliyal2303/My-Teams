import React from 'react';
import debounce from './helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import './notesSidebar.css';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from './sidebaritem';

class SidebarComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            addingNote: false,
            title: null
        };
    }
    render(){
        const { notes, classes, selectedNoteIndex } = this.props;

        if(notes){
            return(
                <div className="sidebarContainer" id="sidebarContainer">
                    <Button
                    onClick={this.newNoteBtnClick} 
                    className="newNoteBtn"
                    style={{backgroundColor:"#464775", color:"white"}}>{this.state.addingNote ? 'Cancel':'New Note'}</Button>
                    {
                        this.state.addingNote ?
                        <div>
                            <input type='text'
                            className="newNoteInput"
                            placeholder='Enter note title'
                            onKeyUp={(e)=> this.updateTitle(e.target.value)}
                            style={{border:"1px solid #464775", marginTop:"0.5vh"}}
                            >
                            </input>
    
                            <Button
                              className="newNoteSubmission"
                              onClick={this.newNote}
                              style={{border:"2px solid #464775", color:"black", 
                              backgroundColor:"#C7C7D5",marginTop:"1vh"}}
                              >Submit Note</Button>
    
                        </div> :
                        null
                    }
    
                    <List>
                        {
                            notes.map((_note,_index)=>{
                                return(
                                    <div key={_index}>
                                        <SidebarItemComponent
                                            _note={_note}
                                            _index={_index}
                                            selectedNoteIndex={selectedNoteIndex}
                                            selectNote={this.selectNote}
                                            deleteNote={this.deleteNote}
                                        ></SidebarItemComponent>
                                        <Divider></Divider>
                                    </div>
                                )
                            })
                        }
                    </List>
    
                </div>
            );
        } else {
            return(<div></div>);
        }
    }

    newNoteBtnClick=()=>{
        this.setState({title: null, addingNote: !this.state.addingNote});
    }

    updateTitle=(txt)=>{
        this.setState({title: txt});
    }

    newNote=()=>{
        this.props.newNote(this.state.title);
        this.setState({title:null, addingNote:false});
    }

    selectNote=(n,i)=> this.props.selectNote(n,i);

    deleteNote=(note)=> this.props.deleteNote(note);
}

export default SidebarComponent;