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
            Page: 'notes',
            pinnedNotes: false,
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
        console.log('hwjhkjsdkjshjdghjsgd')
        noteService.getNotes().then(
            resp => {
                console.log(resp);

                if (resp.status === 200) {
                    for (let i = 0; i < resp.data.message.length; i++) {
                        const note = resp.data.message[i];
                        if(note.pinned==='1'){
                            this.setState({
                                pinnedNotes:true
                            });
                            break;
                        } 
                    }
                    this.setState({
                        Notes: resp.data.message.reverse(),
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
            console.log(error);

        });
    }

    /**
     * change the stat
     */
    changeSnakebarStatus = (status) => {
        this.setState({
            snakebarStatus: status,
        });
    }

    /**
     * 
     */
    remind = () => {
        console.log('hello');
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
    handleReminderTab = () => {
        this.setState({
            Page: 'reminder',
        });
    }

    /**
     * 
     */
    handleNotesTab = () => {
        this.setState({
            Page: 'notes'
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
    * function to logout the user from the app
    */
    logout() {
        userService.logout().then(res => {
            alert('logout succesful');

            this.props.history.push('/login');

        }).catch();
    }

    changeView = () => {
        this.setState({
            gridView: !this.state.gridView,
        });
    }

    handlePinnedNotes=()=>{
        this.setState({
            pinnedNotes: true,
        });
    }

    render() {
        console.log('dash', this.state);
        if ((localStorage.getItem('fundootoken')) === null) {
            this.props.history.push('/login');
        }

        var notes = (this.state.Notes.map((note, index) => {
            return <Draggable key={note.id}>
                <Note gridView={this.state.gridView}
                    key={note.id}
                    note={note}
                    index={index}
                    handleNoteEdit={this.handleNoteEdit}
                    notify={this.notify}
                >
                </Note>
            </Draggable>

        })

        );

        var reminderNotes = (this.state.Notes.map((note, index) => {
            if (note.reminder !== null) {

                return <Draggable key={note.id}>
                    <Note gridView={this.state.gridView}
                        index={index}
                        key={note.id}
                        note={note}
                        handleNoteEdit={this.handleNoteEdit}
                        notify={this.notify}
                    ></Note>
                </Draggable>
            }
        }));

        var pinnedNotes = (this.state.Notes.map((note, index) => {
            // debugger;
            if (note.pinned === true || note.pinned === '1') {
                // if (this.state.pinnedNotes === false) {
                //     this.handlePinnedNotes();
                // }
                return <Draggable key={note.id}>
                    <Note gridView={this.state.gridView}
                        index={index}
                        key={note.id}
                        note={note}
                        handleNoteEdit={this.handleNoteEdit}
                        notify={this.notify}
                    ></Note>
                </Draggable>
            }
        }));
        console.log('pinned', pinnedNotes.length);
        return (


            <div >
                <div><CAppBar gridView={this.state.gridView}
                    user={this.state.user}
                    menuClick={this.handleMenuClick}
                    changeView={this.changeView}
                    logout={this.logout}
                /></div>
                <div>
                    <SideDrawer
                        reminderPage={this.handleReminderTab}
                        notesPage={this.handleNotesTab}
                        open={this.state.drawerOpen}
                    />
                </div>
                <div>
                    <TakeNote
                        sendNote={this.getNewNote}
                        notify={this.notify}
                    />
                </div>
                {/* this.state.gridView===true? */}
                <div className={this.state.gridView === true ? 'notes-div-grid' : 'notes-div'} >
                {this.state.pinnedNotes ? pinnedNotes : ''}
                    
                </div>
                <div className={this.state.gridView === true ? 'notes-div-grid' : 'notes-div'} >
                    {/* {pinnedNotes} */}
                    {this.state.Page==='reminder' ? reminderNotes : notes}
                </div>
                <SnakeBars ref={this.snakebar} open={this.state.snakebarStatus} changeStatus={this.changeSnakebarStatus} />

            </div>
        );
    }
}
