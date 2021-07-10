import React from 'react';
import ReactQuill from 'react-quill';
import debounce from './helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import './editor.css';

class EditorComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            text: '',
            title: '',
            id: ''
        };
    }

    componentDidMount=()=>{
        this.setState({
            text:this.props.selectedNote.body,
            title:this.props.selectedNote.title,
            id:this.props.selectedNote.id
        });
    }

    componentDidUpdate=()=>{
        if(this.props.selectedNote.id !==this.state.id)
        {
            this.setState({
                text:this.props.selectedNote.body,
                title:this.props.selectedNote.title,
                id:this.props.selectedNote.id
            });
        }
    }

    render(){

        const {classes}= this.props;

        return(
            <div className="editorContainer">
                <BorderColorIcon className="editIcon"></BorderColorIcon>
                <input className="titleInput" 
                placeholder='Note title...'
                value={this.state.title ? this.state.title : ''}
                onChange={(e)=> this.updateTitle(e.target.value)}
                style={{outline: "0.5px solid #464775", marginLeft: "0.35vw"}}
                >
                </input>
                <div className="reactQuill-div">
                    <ReactQuill className="reactQuill" id="reactQuill"
                    value={this.state.text} 
                    onChange={this.updateBody}>
                    </ReactQuill>
                </div>
            </div>
        );
    }
    updateBody= async(val)=>{
        await this.setState({text:val});
        this.update();
    };
    updateTitle= async(txt)=>{
        await this.setState({title:txt});
        this.update();
    }
    update = debounce(()=>{
        this.props.noteUpdate(this.state.id,{
            title:this.state.title,
            body:this.state.text
        })
    }, 1500); 
}

export default EditorComponent;