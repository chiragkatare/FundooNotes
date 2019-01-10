import React from 'react';
import Note from "./Note";


export default class NotesDisplay extends React.Component {

    state={
        Notes:this.props.Notes,
    }

    reminderNotes = () => {

    }

    componentWillReceiveProps(nextProps){
        this.setState({
            Notes:nextProps.Notes,
        });
    }

   
    render() {

        // console.log('disp',this.props.Notes);
        

        var notes = (this.state.Notes.map((note, index) => {
            // debugger;
            if (note.pinned === false || note.pinned === '0') {
                return (

                    <Note gridView={this.props.gridView}
                        key={note.id}
                        note={note}
                        index={index}
                        handleNoteEdit={this.props.handleNoteEdit}
                        notify={this.props.notify}
                    >
                    </Note>)
            }
        }));
        // console.log('dispNotes',notes);

        var pinned = (this.props.Notes.map((note, index) => {
            // debugger;
            if (note.pinned === true || note.pinned === '1') {

                return <Note gridView={this.props.gridView}
                    key={note.id}
                    note={note}
                    index={index}
                    handleNoteEdit={this.props.handleNoteEdit}
                    notify={this.props.notify}
                >
                </Note>
            }
        }));
        // console.log(pinned);

        return (
            <div >
                {(() => {
                    switch (this.props.Page) {
                        case 'FundooNotes':
                            return <div><div className={this.props.gridView === true ? 'notes-div-grid' : 'notes-div'}>
                                {pinned}
                            </div>
                                <div className={this.props.gridView === true ? 'notes-div-grid' : 'notes-div'}>
                                    {notes}
                                </div>
                            </div>
                        case 'Reminder':
                            return <div className={this.props.gridView === true ? 'notes-div-grid' : 'notes-div'}>
                                {(this.props.Notes.map((note, index) => {
                                    if (note.reminder !== null) {
                                        return (
                                            <Note gridView={this.props.gridView}
                                                key={note.id}
                                                note={note}
                                                index={index}
                                                handleNoteEdit={this.props.handleNoteEdit}
                                                notify={this.props.notify}
                                            >
                                            </Note>)
                                    }
                                }))}
                            </div>
                        case 'Archive':
                            return <div className={this.props.gridView === true ? 'notes-div-grid' : 'notes-div'}>
                                {(this.props.Notes.map((note, index) => {
                                    if (note.archived==='1' ) {
                                        return (
                                            <Note gridView={this.props.gridView}
                                                key={note.id}
                                                note={note}
                                                index={index}
                                                handleNoteEdit={this.props.handleNoteEdit}
                                                notify={this.props.notify}
                                            >
                                            </Note>)
                                    }
                                }))}
                            </div>

                        default:
                            component = <SalesStuffGroup />;
                    }
                })()}
            </div>
        );
    }

}