import React from 'react';
import Note from "./Note";


export default class SearchPage extends React.Component {

   
    

    /**
     * 
     */
    handleSearch=(note,index)=>{
        
        
        if(note.title!==null&&note.title.includes(this.props.search)){
            // debugger;
            return {Note : note,Index : index}  ;
        }
        // if(){}
        if(note.body!==null&&note.body.includes(this.props.search)){  
            return {note,index} ;
        }
        for (let i = 0; i < note.labels.length; i++) {
            const label = note.labels[i];
           
            if(label.labelname.label.includes(this.props.search)){
                return {note,index}  ;
            }
            
        }
    }

    render() {
        if(this.props.search.length>2){
            var notes = this.props.Notes.filter(this.handleSearch)
        }
        
        console.log('searched notes', notes);
        // var searchedNotes = (this.state.Notes.map((note, index) => {
        //     if (note.deleted === '0' && note.archived === '0' && note.pinned === '0') {
        //         return <Draggable key={note.id}>
        //             <Note gridView={this.state.gridView}
        //                 key={note.id}
        //                 note={note}
        //                 index={index}
        //                 handleNoteEdit={this.handleNoteEdit}
        //                 notify={this.notify}
        //                 user={this.state.user}
        //                 handleNoteLabel={this.handleNoteLabel}
        //                 handleDeleteNoteLabel={this.handleDeleteNoteLabel}
        //             >
        //             </Note>
        //         </Draggable>

        //     }
        // })

        // );
        return (
            <div></div>
            // {searchedNotes}
        );
    }
}