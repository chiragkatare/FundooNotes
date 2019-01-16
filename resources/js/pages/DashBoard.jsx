import CAppBar from "../components/CAppBar";
import React from "react";
import SideDrawer from '../components/SideDrawer'
import TakeNote from '../components/TakeNote';
import UserService from '../services/UserService';
import Note from "../components/Note";
import NotesService from "../services/NotesService";
import moment from 'moment';
import SnakeBars from '../components/Snakebars';
import DeletedNote from '../components/DeletedNote';
import FormData from 'form-data';
import SearchPage from '../components/SearchedPage';
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
            search: '',
            searchBarStatus: false,
            dragNote: null,
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
        if (localStorage.getItem('fundootoken') === null) {
            this.props.history.push('/login');
            return;
        }

        noteService.getNotes().then(
            resp => {
                // console.log(resp);

                if (resp.status === 200) {
                    var Notes = [];
                    var notes = resp.data.message;
                    notes.forEach(note => {
                        Notes[note.index] = note
                    });
                    this.setState({
                        Notes: Notes,
                    });
                }
            }
        ).catch();
        setInterval(this.remind, 30000);

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
        // this.forceUpdate();

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
        if (page !== this.state.Page) {
            this.setState({
                Page: page,
            });
        }
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

        let Notes = [...this.state.Notes];
        noteService.editNote(note).then(resp => {
            Notes[index] = resp.data.message[0];
            this.setState(
                { Notes }
            );

            // this.notify('Note Updated');
        }).catch(error => {
            console.log(error);

            this.notify('Offline');
        }
        );
        // TempNotes[index] = note;
        // this.setState({
        //     Notes: TempNotes
        // });
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
        noteService.deleteLabel(labelid).then(response => {
            if (response.status === 200) {
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
        noteService.editLabel(data).then(response => {
            if (response.status === 200) {
                // debugger;
                let tempUser = this.state.user;
                tempUser.labels[index] = response.data.label;
                this.setState({
                    user: tempUser,
                    Notes: response.data.notes
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
        noteService.addNoteLabel(data).then(response => {
            if (response.status === 200) {
                debugger;
                let note = response.data.note;
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
        noteService.deleteNoteLabel(data).then(response => {
            if (response.status === 200) {
                // debugger;
                let note = response.data.note;
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

    handleProfilePic = (profile) => {
        // debugger;
        // var tempUser = this.state.user;
        // tempUser.profilepic=profile;
        let formData = new FormData();
        formData.append('profilepic', profile)
        userService.addProfilePicture(formData).then(resp => {
            console.log(resp);
            // debugger;
            this.setState({
                user: resp.data.data,
            });

        }).catch(err => {
            console.log(err, 'error');

        });
    }

    /**
     * function to add pictures to note
     */
    handleNotePic = (file, noteIndex) => {

    }

    /**
     * 
     */
    handleSearchTerm = (word) => {
        // debugger;
        this.setState({ ...this.state, search: word });
    }
    handleSearchBar = () => {
        this.setState({
            searchBarStatus: !this.state.searchBarStatus
        });

    }
    handleDrag = () => {
        console.log("handleDrag");

    }
    handleStart = () => {
        console.log("handleStart");
    }
    handleStop = () => {
        console.log("handleStop");
    }
    /**
     * 
     */
    noteComponent = (note, index) => {
        return <Note gridView={this.state.gridView}
            dashState={this.state}
            index={index}
            key={note.id}
            note={note}
            handleNoteEdit={this.handleNoteEdit}
            notify={this.notify}
            user={this.state.user}
            handleNoteLabel={this.handleNoteLabel}
            handleDeleteNoteLabel={this.handleDeleteNoteLabel}
            handleSetDragNote={this.handleSetDragNote}
            // dragNote={this.state.dragNote}
            handleImageUpload={this.handleImageUpload}
            noteDrop={this.noteDrop}
            handleImageDelete={this.handleImageDelete}
            handlePosition={this.handlePosition}
        ></Note>
    }

    handleDragOver = (event) => {

        console.log('draggg', event);

    }

    handleSetDragNote = (index) => {
        this.setState({
            dragNote: index
        });
    }


    noteDrop = (dropIndex) => {

        var Notes = [...this.state.Notes];
        if (dropIndex > this.state.dragNote) {
            // debugger;
            var note = this.state.Notes[this.state.dragNote];
            for (let i = this.state.dragNote; i < dropIndex; i++) {
                Notes[i] = Notes[i + 1];
            }
            Notes[dropIndex] = note;
        }

        else {
            // debugger;
            var note = Notes[this.state.dragNote];
            for (let i = this.state.dragNote; i > dropIndex; i--) {
                console.log(i);
                Notes[i] = Notes[i - 1];
            }
            Notes[dropIndex] = note;
        }
        this.setState({
            Notes: Notes,
        });
    }

    /**
     * function to add image to the note and send the image to backend
     */
    handleImageUpload = (image, noteindex) => {
        // debugger;
        // var tempUser = this.state.user;
        // tempUser.profilepic=profile;
        let formData = new FormData();
        formData.append('notePic', image)
        formData.append('noteid', this.state.Notes[noteindex].id)
        noteService.addNoteImage(formData).then(resp => {
            console.log(resp);
            debugger;
            let Notes = [...this.state.Notes];
            Notes[noteindex] = resp.data.note[0];
            this.setState({
                Notes
            });

        }).catch(err => {
            console.log(err, 'error');
            // this.notify('Image Cannot Be Uploaded')
        });
    }

    handleImageDelete=(noteindex,imageid)=>{
        
        var data = {imageid:imageid,
                    noteid:this.state.Notes[noteindex].id}
        noteService.deleteNoteImage(data).then(resp=>{
            debugger;
            let Notes = [...this.state.Notes];
            Notes[noteindex] = resp.data.note[0];
            this.setState({
                Notes
            });
        }).catch(error=>{
            debugger;
            alert('Image Delete',error);
        });
    }

    /**
     * function to call the noteservice to save note positions at backend api on drag and drop
     * 
     * 
     */
    handlePosition = (dragIndex, dropIndex) => {
        var data = { dragIndex, dropIndex };
        noteService.saveIndex(data).then(resp => {
            console.log('Notes Moved', resp);

        }).catch(err => {
            console.log('Notes Not Moved', err);

        });
    }

    /**
     * 
     */
    render() {

        // if ((localStorage.getItem('fundootoken')) === null) {

        // }

        if (this.state.user === null) {
            return null;
        }
        console.log('dash', this.state);


        var notes = (this.state.Notes.map((note, index) => {
            if (note.deleted === '0' && note.archived === '0' && note.pinned === '0') {
                return this.noteComponent(note, index);
            }
        })

        );
        // console.log('notes', notes);


        var reminderNotes = (this.state.Notes.map((note, index) => {
            if (note.deleted === '0' && note.reminder !== null && note.archived === '0') {
                return this.noteComponent(note, index);
            }
        }));

        var pinnedNotes = (this.state.Notes.map((note, index) => {
            // debugger;
            if (note.pinned === '1' && note.archived === '0') {
                return this.noteComponent(note, index);
            }
        }));
        // console.log('pinned', pinnedNotes);
        return (


            <div className={this.state.drawerOpen === true ? 'main-div-drawer-open' : 'main-div'} >
                <div><CAppBar gridView={this.state.gridView}
                    dashState={this.state}
                    user={this.state.user}
                    menuClick={this.handleMenuClick}
                    changeView={this.changeView}
                    logout={this.logout}
                    Page={this.state.Page}
                    handleProfilePic={this.handleProfilePic}
                    handleSearchTerm={this.handleSearchTerm}
                    handleSearchBar={this.handleSearchBar}
                    searchBarStatus={this.state.searchBarStatus}
                /></div>
                <div >
                    <SideDrawer
                        dashState={this.state}
                        user={this.state.user}
                        Page={this.state.Page}
                        handlePage={this.handlePageTab}
                        open={this.state.drawerOpen}
                        handleNewLabel={this.handleNewLabel}
                        handleDeleteLabel={this.handleDeleteLabel}
                        handleEditLabel={this.handleEditLabel}

                    />
                </div>

                {this.state.search.length > 2 ?
                    <SearchPage
                        Notes={this.state.Notes}
                        search={this.state.search}
                        gridView={this.state.gridView}
                        dashState={this.state}
                        handleNoteEdit={this.handleNoteEdit}
                        notify={this.notify}
                        user={this.state.user}
                        handleNoteLabel={this.handleNoteLabel}
                        handleDeleteNoteLabel={this.handleDeleteNoteLabel}
                        dashState={this.state}
                    /> : <div>
                        {this.state.Page === 'Bin' ? <div className='notes-div'></div> : <div>
                            <TakeNote
                                sendNote={this.getNewNote}
                                notify={this.notify}
                                Notes={this.state.Notes}
                            />
                        </div>}
                        {/* this.state.gridView===true? */}
                        {(() => {


                            switch (this.state.Page) {

                                case 'FundooNotes':
                                    return <div><div onDragOver={this.handleDragOver} className={this.state.gridView === true ? 'notes-div-grid' : 'notes-div'}>
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
                                                return this.noteComponent(note, index);
                                            }
                                        }))}
                                    </div>
                                case 'Bin':
                                    return <div className={this.state.gridView === true ? 'notes-div-grid' : 'notes-div'}>
                                        {(this.state.Notes.map((note, index) => {
                                            if (note.deleted === '1') {
                                                return (
                                                    <DeletedNote gridView={this.state.gridView}
                                                        dashState={this.state}
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
                                                        return this.noteComponent(note, index);
                                                    }
                                                }
                                            }
                                        }))}
                                    </div>
                                // component = <SalesStuffGroup />;
                            }
                        })()}
                    </div>}

                <SnakeBars ref={this.snakebar} open={this.state.snakebarStatus} changeStatus={this.changeSnakebarStatus} />

            </div>
        );
    }

}
