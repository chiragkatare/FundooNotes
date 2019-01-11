import React from 'react';
import Note from "./Note";
import Draggable from 'react-draggable';


export default class SearchPage extends React.Component {

   
    

    noteCreate=(note,index)=>{
        if (note.deleted === '0' && note.archived === '0' && note.pinned === '0') {
            return <Draggable key={note.id}>
                <Note gridView={this.props.gridView}
                    dashState={this.props.dashState}
                    key={note.id}
                    note={note}
                    index={index}
                    handleNoteEdit={this.props.handleNoteEdit}
                    notify={this.props.notify}
                    user={this.props.user}
                    handleNoteLabel={this.props.handleNoteLabel}
                    handleDeleteNoteLabel={this.props.handleDeleteNoteLabel}
                >
                </Note>
            </Draggable>

        }
    }

    /**
     * 
     */
    handleSearch=(note,index)=>{
        
        
        if(note.title!==null&&note.title.includes(this.props.search)){
            // debugger;
            return  this.noteCreate(note,index) ;
        }
        // if(){}
        if(note.body!==null&&note.body.includes(this.props.search)){  
            return this.noteCreate(note,index) ;
        }
        for (let i = 0; i < note.labels.length; i++) {
            const label = note.labels[i];
           
            if(label.labelname.label.includes(this.props.search)){
                return this.noteCreate(note,index) ;
            }
            
        }
    }

    render() {
        if(this.props.search.length>2){
            var searchedNotes = this.props.Notes.map((note,index)=>this.handleSearch(note,index));
        }
        // debugger ;
        // console.log('searched notes', notes);
       if (searchedNotes===null){
           return null ;
       }
        
        return (
           <div  className={this.props.dashState.gridView === true ? 'notes-div-grid' : 'notes-div'} >{searchedNotes}</div>
            
        );
    }
}