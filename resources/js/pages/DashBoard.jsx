import CAppBar from "../components/CAppBar";
import React from "react";
import SideDrawer from '../components/SideDrawer'
import TakeNote from '../components/TakeNote';
import UserService from '../services/UserService';
import Note from "../components/Note";
import NotesService from "../services/NotesService";
import moment from 'moment';
import SnakeBars from '../components/Snakebars';
import Draggable from 'react-draggable';
import DeletedNote from '../components/DeletedNote';
// import NotesGrid from "../components/NotesGrid";
// import SmallAppBar from '../components/SmallAppBar';

var userService = new UserService();
var noteService = new NotesService();

export default class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            user: null,
            Notes: [],
            gridView: false,
            smallScreen: false,
            Page: 'FundooNotes',
            pinnedNotes: true,
        }
        this.snakebar = React.createRef();
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.logout = this.logout.bind(this);
        this.getNewNote = this.getNewNote.bind(this);
    }




    /**
     * LIFECYCLE METHOD 
     * Runs Automatically by react before mountinng a component
     */
    componentWillMount() {
        // debugger;
        // console.log('compwillmountdash');

        noteService.getNotes().then(
            resp => {
                // console.log(resp);

                if (resp.status === 200) {
                    var notes = resp.data.message.reverse();

                    this.setState({
                        Notes: notes,
                    });
                }
            }
        ).catch();
        setInterval(this.remind, 60000);

        userService.getUserData().then(resp => {
            this.setState({
                user: resp.data[0]
            });
            localStorage.setItem('userFirstname', resp.data[0].firstname);
        }).catch(error => {
            console.log('error', error);

        });
    }

    // shouldComponentUpdate(){

    //     if(this.state.Notes.length===0){
    //         return false;
    //     }
    //     return true ;
    // }

    /**
     * change the stat
     */
    changeSnakebarStatus = (status) => {
        this.setState({
            snakebarStatus: status,
        });
    }

    /**
     * method to remind the user about the reminder set and poppin up the snake bar
     */
    remind = () => {

        this.state.Notes.forEach(note => {
            if (note.reminder === moment().format('DD MMM YYYY , h:mm a')) {
                this.notify(note.reminder);
            }
        });
    }

    // componentWillUnmount() {
    //     window.removeEventListener("resize", this.changeRender);
    // }


    notify = (message) => {
        // debugger;
        this.snakebar.current.handleNewMessage(message);
    }

    getNewNote = (note) => {
        // debugger;

        // debugger;
        this.forceUpdate();

        var arr = this.state.Notes;
        arr.unshift(note);
        this.setState({
            Notes: arr,
        })

    }

    /**
     * handle the clock on remonder tab in sidbar by changin to show only reminder tab in the dashBoard
     */
    handlePageTab = (page) => {
        this.setState({
            Page: page,
        });
    }

    /**
     * 
     */
    handleMenuClick() {
        if (this.state.drawerOpen === false)
            this.setState({ drawerOpen: true });
        else
            this.setState({ drawerOpen: false });

    }

    /**
     * 
     */
    handleNoteEdit = (index, note) => {
        // debugger;
        let TempNotes = this.state.Notes;
        noteService.editNote(note).then(resp => {
            // this.notify('Note Updated');
        }).catch(error => {
            alert(error);
        }
        );
        TempNotes[index] = note;
        this.setState({
            Notes: TempNotes
        });
    }


    /**
     * 
     */
    handleNoteDelete = (index) => {
        // debugger;
        let TempNotes = this.state.Notes
        noteService.deleteNote(TempNotes[index]).then(response => {
            if (response.status === 200) {
                TempNotes.splice(index, 1);
                this.setState({
                    Notes: TempNotes
                })
            }
        }).catch(errors => {
            console.log('errors', errors);
        })
    }



    /**
    * function to logout the user from the app
    */
    logout() {
        userService.logout().then(res => {
            alert('logout succesful');

            this.props.history.push('/login');

        }).catch();
    }

    /**
     * 
     */
    changeView = () => {
        this.setState({
            gridView: !this.state.gridView,
        });
    }

    /**
     * 
     */
    handlePinnedNotes = () => {
        this.setState({
            pinnedNotes: true,
        });
    }

    /**
     * 
     */
    handleNewLabel = (label) => {
        noteService.createLabel(label).then(resp => {
            let label = resp.data.label;
            let tempUser = this.state.user;
            tempUser.labels.push(label);
            this.setState({
                user: tempUser,
            });
        }).catch(err => {
            console.log('newLabel error', err);
        });
    }

    /**
     * 
     */
    handleDeleteLabel = (labelid, index) => {
        noteService.deleteLabel(labelid).then(resp => {
            if (resp.status === 200) {
                let tempUser = this.state.user;
                tempUser.labels.splice(index, 1);
                this.setState({
                    user: tempUser,
                });
            }
            else {
                this.notify('Unable To delete');
            }

        }).catch();
    }

    /**
     * 
     */
    handleEditLabel = (data, index) => {
        noteService.editLabel(data).then(resp => {
            if (resp.status === 200) {
                debugger;
                let tempUser = this.state.user;
                tempUser.labels[index] = resp.data.label;
                this.setState({
                    user: tempUser,
                    Notes: resp.data.notes
                });

            }
            else {
                this.notify('Unable To Edit');
            }

        }).catch(err => {
            console.log('labeledit', err);

        });
    }

    handleNoteLabel = (index, noteid, labelid) => {
        // debugger;
        let data = {
            noteid: noteid,
            labelid: labelid
        };
        noteService.addNoteLabel(data).then(resp => {
            if (resp.status === 200) {
                // debugger;
                let note = resp.data.note;
                let tempNotes = this.state.Notes;
                tempNotes[index] = note[0];
                this.setState({
                    Notes: tempNotes,
                });
            }
        }).catch(err => {
            console.log('addlabelnoteserr', err);

        });
    }

    handleDeleteNoteLabel = (index, noteid, labelid) => {
        // debugger;
        let data = {
            noteid: noteid,
            labelid: labelid
        };
        noteService.deleteNoteLabel(data).then(resp => {
            if (resp.status === 200) {
                // debugger;
                let note = resp.data.note;
                let tempNotes = this.state.Notes;
                tempNotes[index] = note[0];
                this.setState({
                    Notes: tempNotes,
                });
            }
        }).catch(err => {
            console.log('deletelabelnoteserr', err);

        });
    }

    /**
     * 
     */
    render() {
        console.log('dash', this.state);
        if ((localStorage.getItem('fundootoken')) === null) {
            this.props.history.push('/login');
        }

        if (this.state.user === null) {
            return null;
        }

        var notes = (this.state.Notes.map((note, index) => {
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
        // console.log('notes', notes);


        var reminderNotes = (this.state.Notes.map((note, index) => {
            if (note.deleted === '0' && note.reminder !== null && note.archived === '0') {

                return <Draggable key={note.id}>
                    <Note gridView={this.state.gridView}
                        index={index}
                        key={note.id}
                        note={note}
                        handleNoteEdit={this.handleNoteEdit}
                        notify={this.notify}
                        user={this.state.user}
                        handleNoteLabel={this.handleNoteLabel}
                        handleDeleteNoteLabel={this.handleDeleteNoteLabel}
                    ></Note>
                </Draggable>
            }
        }));

        var pinnedNotes = (this.state.Notes.map((note, index) => {
            // debugger;
            if (note.pinned === '1' && note.archived === '0') {

                return <Draggable key={note.id}>
                    <Note gridView={this.state.gridView}
                        index={index}
                        key={note.id}
                        note={note}
                        handleNoteEdit={this.handleNoteEdit}
                        notify={this.notify}
                        user={this.state.user}
                        handleNoteLabel={this.handleNoteLabel}
                        handleDeleteNoteLabel={this.handleDeleteNoteLabel}
                    ></Note>
                </Draggable>
            }
        }));
        // console.log('pinned', pinnedNotes);
        return (


            <div className={this.state.drawerOpen === true ? 'main-div-drawer-open' : 'main-div'} >
                <div><CAppBar gridView={this.state.gridView}
                    user={this.state.user}
                    menuClick={this.handleMenuClick}
                    changeView={this.changeView}
                    logout={this.logout}
                    Page={this.state.Page}
                /></div>
                <div>
                    <SideDrawer
                        user={this.state.user}
                        Page={this.state.Page}
                        handlePage={this.handlePageTab}
                        open={this.state.drawerOpen}
                        handleNewLabel={this.handleNewLabel}
                        handleDeleteLabel={this.handleDeleteLabel}
                        handleEditLabel={this.handleEditLabel}

                    />
                </div>
                <div>
                    <TakeNote
                        sendNote={this.getNewNote}
                        notify={this.notify}
                    />
                </div>
                {/* this.state.gridView===true? */}
                {(() => {


                    switch (this.state.Page) {

                        case 'FundooNotes':
                            return <div><div className={this.state.gridView === true ? 'notes-div-grid' : 'notes-div'}>
                                {pinnedNotes}
                            </div>
                                <div className={this.props.gridView === true ? 'notes-div-grid' : 'notes-div'}>
                                    {notes}
                                </div>
                            </div>
                        case 'Reminder':
                            return <div className={this.state.gridView === true ? 'notes-div-grid' : 'notes-div'}>
                                {reminderNotes}
                            </div>
                        case 'Archive':
                            return <div className={this.state.gridView === true ? 'notes-div-grid' : 'notes-div'}>
                                {(this.state.Notes.map((note, index) => {
                                    if (note.archived === '1') {
                                        return (
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
                                            </Note>)
                                    }
                                }))}
                            </div>
                        case 'Bin':
                            return <div className={this.state.gridView === true ? 'notes-div-grid' : 'notes-div'}>
                                {(this.state.Notes.map((note, index) => {
                                    if (note.deleted === '1') {
                                        return (
                                            <DeletedNote gridView={this.state.gridView}
                                                key={note.id}
                                                note={note}
                                                index={index}
                                                handleNoteEdit={this.handleNoteEdit}
                                                handleNoteDelete={this.handleNoteDelete}
                                                notify={this.notify}
                                                user={this.state.user}
                                                handleNoteLabel={this.handleNoteLabel}
                                                handleDeleteNoteLabel={this.handleDeleteNoteLabel}
                                            >
                                            </DeletedNote>)
                                    }
                                }))}
                            </div>
                        default:
                            return <div className={this.state.gridView === true ? 'notes-div-grid' : 'notes-div'}>
                                {(this.state.Notes.map((note, index) => {
                                    for (let i = 0; i < note.labels.length; i++) {
                                        const label = note.labels[i];
                                        if (label.labelname.label === this.state.Page) {
                                            if (note.deleted === '0') {
                                                return (
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
                                                )
                                            }
                                        }
                                    }
                                }))}
                            </div>
                        // component = <SalesStuffGroup />;
                    }
                })()}
                <SnakeBars ref={this.snakebar} open={this.state.snakebarStatus} changeStatus={this.changeSnakebarStatus} />

            </div>
        );
    }

}
