import React from 'react';
import Note from "./Note";


export default class LabelComp extends React.Component {

   
    

    /**
     * 
     */
    handleSearch=(note,index)=>{
        if(note.title.includes(this.state.search)){
            return note ;
        }
        if(note.body.includes(this.state.search)){
            return note ;
        }
        for (let i = 0; i < note.labels.length; i++) {
            const label = note.labels[i];
            if(label.labelname.label.includes(this.state.search)){
                return note ;
            }
            
        }
    }

    render() {
        var notes = this.props.Notes.filter(this.handleSearch)
        console.log('searched notes', this.state);
        var searchedNotes = (this.state.Notes.map((note, index) => {
            if (note.deleted === '0' && note.archived === '0' && note.pinned === '0') {
                return <Draggable key={note.id}>
                    <Note gridView={this.state.gridView}
                        key={note.id}
                        note={note}
                        index={index}
                        handleNoteEdit={this.handleNoteEdit}
                        notify={this.notify}
                        user={this.state.user}
                        handleNoteLabel={this.handleNoteLabel}
                        handleDeleteNoteLabel={this.handleDeleteNoteLabel}
                    >
                    </Note>
                </Draggable>

            }
        })

        );
        return (
            {searchedNotes}
        );
    }
}