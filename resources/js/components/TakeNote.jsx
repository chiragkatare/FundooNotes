import React from 'react';
import { Card, InputBase, IconButton, Typography, Button, CardContent, createMuiTheme, MuiThemeProvider } from '@material-ui/core/';
import NotesService from "../services/NotesService";
import Reminder from '../components/Reminder';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


var noteService = new NotesService();


/**
 * theme for material ui to override the defaults
 * 
 */
const theme = createMuiTheme({
    overrides: {
        MuiChip: {
            label: {
                fontSize: '0.81 rem'
            },
            root: {
                height: 26
            }
        }
    }, typography: {
        useNextVariants: true,
    },
    // MuiChip-label-408
});//MuiChip-root-389 MuiChip-deletable-395


export default class TakeNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            id: '',
            title: '',
            body: '',
            pinned: false,
            reminder: null,
        };
        this.handleTakeNote = this.handleTakeNote.bind(this);
    }

    /**
     * function to handle creation of new note
     */
    handleNewNote = () => {
        // debugger;
        var Note = {
            id: '',
            title: this.state.title,
            body: this.state.body,
            reminder: this.state.reminder,
            pinned: this.state.pinned,
        }
        if ((Note.title !== '' || Note.body !== '')) {
            Note = this.sendNote(Note);
            this.props.sendNote(Note);
            this.setState({
                id: '',
                title: '',
                body: '',
                reminder: '',
                pinned: 0,
            });
        }
    }

    /**
     * function to send newly created note to the backend
     */
    sendNote = (note) => {

        noteService.sendNote(note).then(resp => {
            if (resp.status === 201) {
                // alert("note Created");
                //console.log('resp', resp);

                note.id = resp.data.id;
            }
        }).catch();
        return note;
    }

    /**
     * function to handle input of the value in text fields
     */
    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });

    }

    /**
     * function to get the notes and change the take note column
     */
    handleTakeNote = () => {
        this.setState({
            active: !this.state.active,
        });
        this.handleNewNote();
    }

    /**
     * handle the click aeay event of take note
     */
    handleClickAway = () => {
        this.setState({
            active: false,
        });
        this.handleNewNote();
    }

    /**
     * function handle delete of reminder
     */
    deleteReminder = () => {
        this.setState({
            reminder: null,
        });
    }

    /**
     * function to set reminder in the state
     */
    setReminder = (rem) => {
        this.setState({
            reminder: rem,
        });
    }

    /**
     * function to pin the notes
     */
    handlePin = () => {
        this.setState({
            pinned: !this.state.pinned
        });
    }

    /**
     * render method called automaticaly by 
     */
    render() {
        var Open = (<MuiThemeProvider theme={theme}>
            <ClickAwayListener onClickAway={this.handleClickAway} >
                <Card className='takenote-div-open' >
                    <div className='note-top-div'>
                        <InputBase name='title' fullWidth placeholder='Title' onChange={this.handleInput} />
                        <div className='note-icon-pin' role='button' onClick={this.handlePin} >
                            <img src={this.state.pinned ? require('../assets/icons/pin.svg') : require('../assets/icons/unpin.svg')} alt="" />
                        </div>
                    </div>
                    <InputBase name='body' multiline fullWidth placeholder='Take a note..' onChange={this.handleInput} />
                    <div className='note-chip-div'>{this.state.reminder === null ? ('') : (<Chip
                        label={this.state.reminder}
                        onDelete={this.deleteReminder}
                        icon={<img className='icon' src={require('../assets/icons/ReminderClock.svg')} alt="" />}
                        variant='default'
                    />)}</div>
                    <div className='takenote-bottom-icons-div'>
                        <div>
                            <Reminder setReminder={this.setReminder} />
                        </div>

                        <div className='note-icon-div' role='button'>
                            <img src={require('../assets/icons/Collaborator.svg')} alt="" />
                        </div>
                        <div className='note-icon-div' role='Button'>
                            <img src={require('../assets/icons/ColorPallate.svg')} alt="" />
                        </div>
                        <div className='note-icon-div' role='Button'>
                            <img src={require('../assets/icons/AddImage.svg')} alt="" />
                        </div>
                        <div className='note-icon-div' role='Button'>
                            <img src={require('../assets/icons/Archive.svg')} alt="" />
                        </div>
                        <div className='note-icon-div' role='Button'>
                            <img src={require('../assets/icons/More.svg')} alt="" />
                        </div>
                        <Button className='card-button-close' component="span" onClick={this.handleTakeNote}>
                            Close
        </Button>

                    </div>


                </Card>
            </ClickAwayListener>
        </MuiThemeProvider>
        );

        var Close = (<div className='takenote-div' onClick={this.handleTakeNote} >
            <InputBase fullWidth placeholder='Take a note..' />
        </div>);

        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    {this.state.active ? (Open) : (Close)}
                </div>
            </MuiThemeProvider>
        );
    }


}