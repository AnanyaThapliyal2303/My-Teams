import React from 'react';
import db from '../firebase';
import './Notes.css';
import SidebarComponent from './notesSidebar';
import EditorComponent from './editor';
import firebase from "firebase";
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class Notes extends React.Component{

    constructor(){
        super();
        this.state={
            selectedNoteIndex: null,
            selectedNote: null,
            notes: null
        };
    }

    render(){
        return (
            <div className="main-notes-page" id="main-notes-page">
                <Header/>
                <div className="notes-flex">
                <Sidebar/>
                <div className="notes-container">
                    <SidebarComponent 
                        selectedNoteIndex={this.state.selectedNoteIndex}
                        notes={this.state.notes}
                        deleteNote={this.deleteNote}
                        selectNote={this.selectNote}
                        newNote={this.newNote}
                        ></SidebarComponent>
                        {
                        this.state.selectedNote ?
                        <EditorComponent selectedNote={this.state.selectedNote}
                            selectedNoteIndex={this.state.selectedNoteIndex}
                            notes={this.state.notes}
                            noteUpdate={this.noteUpdate}
                            ></EditorComponent> :
                            null
                        }
                    <div id="written-instruction">
                        <ArrowBackIcon/>Open a note to view editor!
                    </div>
                </div>
            </div>
        </div>
        )
    }
    
    componentDidMount=()=>{
       db
        .collection('notes')
        .onSnapshot(serverUpdate => {
            const notes=serverUpdate.docs.map(_doc=>{
                const data=_doc.data();
                data['id']=_doc.id;
                return data;
            });
            console.log(notes);
            this.setState({notes: notes});
        });
    }

selectNote=(note,index)=>this.setState({selectedNoteIndex: index, selectedNote:note});
noteUpdate=(id,noteObj)=>{
       db
        .collection('notes')
        .doc(id)
        .update({
            title: noteObj.title,
            body: noteObj.body,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
  }
  newNote = async(title)=>{
      const note={
          title:title,
          body:''
      };
    const newFromDB= await db
      .collection('notes')
      .add({
          title:note.title,
          body:note.body,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      const newID=newFromDB.id;
      await this.setState({ notes: [...this.state.notes, note]});
      const newNoteIndex=this.state.notes.indexOf(this.state.notes.filter(_note=>_note.id === newID)[0]);
      this.setState({selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex});

  }

  deleteNote=async (note)=>{
      const noteIndex= this.state.notes.indexOf(note);
      await this.setState({notes: this.state.notes.filter(_note=> _note !== note)});
      if(this.state.selectedNoteIndex===noteIndex){
          this.setState({selectedNoteIndex: null, selectedNote:null});
      } else {
          this.state.notes.length > 1 ?
          this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
          this.setState({selectedNoteIndex:null, selectedNote:null});
      }

      db
      .collection('notes')
      .doc(note.id)
      .delete();
  }
}

export default Notes;

