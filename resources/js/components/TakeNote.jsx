import React from 'react';
import { Card, InputBase, IconButton, Typography, Button, CardContent, createMuiTheme, MuiThemeProvider } from '@material-ui/core/';
import NotesService from "../services/NotesService";
import Reminder from '../components/Reminder';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ColorPallate from './ColorPallate';


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


export default class TakeNote extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            id: '',
            title: '',
            body: '',
            pinned: '0',
            archived: '0',
            deleted: '0',
            color: 'rgb(255, 255, 255)',
            reminder: null,
        };
        this.handleTakeNote = this.handleTakeNote.bind(this);
    }

    /**
     * function to handle creation of new note
     * 
     * @var string message for snakebar
     */
    handleNewNote = (message) => {
        let ss = this.state;
        // debugger;
        var Note = {
            id: '',
            title: this.state.title,
            body: this.state.body,
            reminder: this.state.reminder,
            pinned: this.state.pinned,
            color: this.state.color,
            archived: this.state.archived,
            deleted: this.state.deleted,
            labels:[],
        }
        if ((Note.title !== '' || Note.body !== '')) {
            Note = this.sendNote(Note);
            this.props.sendNote(Note);
            this.props.notify(message);
            this.setState({
                active: !this.state.active,
                id: '',
                title: '',
                body: '',
                reminder: null,
                pinned: '0',
                color: 'rgb(255, 255, 255)',
                archived: '0',
                deleted: '0',
            });
        }
        else{
            this.setState({
                // id: '',
                // title: '',
                // body: '',
                active: !this.state.active,
                reminder: null,
                pinned: '0',
                color: 'rgb(255, 255, 255)',
                archived: '0',
                deleted: '0',
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
        this.handleNewNote('Note Created');
    }

    /**
     * handle the click aeay event of take note
     */
    handleClickAway = () => {
       ()=>{this.setState({
            active: false,
        })};
        this.handleNewNote('Note Created');
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
            pinned: this.state.pinned==='1'?'0':'1'
            
        });
        console.log(this.state.pinned);
        
    }

    /***
     * 
     */
    handleColor = (color) => {
        this.setState({
            color: color
        });
    }

    /**
     * 
     */
    handleArchived=()=>{
        // debugger;
        this.setState({
            archived:'1',
        },()=>{
            this.handleNewNote('Note Archived');
            console.log('archived',this.state);
        });
        
    }


    /**
     * render method called automaticaly by 
     */
    render() {
        var Open = (<MuiThemeProvider theme={theme}>
            <ClickAwayListener onClickAway={this.handleClickAway} >
                <Card className='takenote-div-open' style={{ backgroundColor: this.state.color }} >
                    <div className='note-top-div'>
                        <InputBase name='title' fullWidth placeholder='Title' onChange={this.handleInput} />
                        <div className='note-icon-pin' role='button' onClick={this.handlePin} >
                            <img src={this.state.pinned==='1' ? require('../assets/icons/pin.svg') : require('../assets/icons/unpin.svg')} alt="" />
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
                        <ColorPallate
                            setColor={this.handleColor} />
                        <div className='note-icon-div' role='Button'>
                            <img src={require('../assets/icons/AddImage.svg')} alt="" />
                        </div>
                        <div className='note-icon-div' role='Button' onClick={this.handleArchived}>
                            <img src={ this.state.archived==='1'? require('../assets/icons/Unarchive.svg'):require('../assets/icons/Archive.svg')} alt="" />
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