import React from "react";
import { Card } from '@material-ui/core';
import { Button, IconButton, Typography, InputBase, CardActions, CardContent, createMuiTheme, MuiThemeProvider } from '@material-ui/core/';
import Reminder from './Reminder';
import Chip from '@material-ui/core/Chip';
import { red } from "@material-ui/core/colors";
import NoteEdit from './NoteEdit';
import ColorPallate from './ColorPallate';
import NoteOptions from './NoteOptions';
// import Moment from 'react-moment';


/**
 * theme for material ui to override the defaults
 * 
 */
const theme = createMuiTheme({
    overrides: {
        MuiCardContent: {
            root: {
                paddingTop: 6,
                paddingBottom: 6,
                // paddingRight:4,
            }
        },
        MuiPaper: {
            rounded: {
                borderRadius: 8,
            },
            elevation1: {
                boxShadow: '0 0 0'
            },
        },
        MuiCard: {
            root: {
                overflow: 'inherit'
            },
        },

    }, typography: {
        useNextVariants: true,
    },
    //..MuiPaper-elevation1-252 .MuiCard-root-510  .MuiCardContent-root-276
});


export default class Note extends React.PureComponent {


    constructor(props) {
        super(props);

        this.noteEdit = React.createRef();
    }

    // /**
    //  * LIFECYCLE METHOD
    //  * Called Automatically
    //  * runs before mounting of the component
    //  */
    // componentWillMount() {
    //     this.setState({
    //         note: this.props.note,
    //     })
    // }

    editNote = () => {
        this.noteEdit.current.handleClickOpen();
    }

    /**
     * 
     */
    setReminder = (s) => {
        let tempNote = this.props.note;
        tempNote.reminder = s;
        this.props.handleNoteEdit(this.props.index, tempNote);
    }

    /**
     * 
     */
    handleColor = (color) => {
        let tempNote = this.props.note;
        if (tempNote.color !== color) {
            // debugger;
            tempNote.color = color;
            this.props.handleNoteEdit(this.props.index, tempNote);
        }
    }

    /**
     * function to change the pin and unpin of note
     */
    handlePin = () => {

        let tempNote = this.props.note;
        // debugger;
        tempNote.pinned = (tempNote.pinned === '0') ? '1' : '0';
        this.props.handleNoteEdit(this.props.index, tempNote);

    }

    handleArchive = () => {
        debugger;
        let tempNote = this.props.note;
        // debugger;
        // console.log(this.props.note);

        tempNote.archived = (tempNote.archived === '0') ? '1' : '0';
        this.props.handleNoteEdit(this.props.index, tempNote);
        tempNote.archived === '0' ? this.props.notify('Note Unarchived') : this.props.notify('Note Archived');
    }

    render() {
        // console.log('note'+this.props.index,this.props)
        return (
            <div className={this.props.gridView === true ? 'note-card-grid' : 'note-card'}>
                <MuiThemeProvider theme={theme}>
                    <div className='note-icon-pin' role='button' onClick={this.handlePin} >
                        <img src={(this.props.note.pinned === '1') ? require('../assets/icons/pin.svg') : require('../assets/icons/unpin.svg')} alt="" />
                    </div>
                    <Card className='note-card-def' style={{ border: '1px solid #dadce0', backgroundColor: this.props.note.color }} >
                        <CardContent className='note-card-content' onClick={this.editNote}>
                            <div className='note-top-div'>

                                <Typography variant='h6' component="p">
                                    {this.props.note.title}
                                </Typography>

                            </div>
                            <Typography className='note-body-text' component="p">
                                {this.props.note.body}
                            </Typography>
                            <div className='note-card-chip-div' >{this.props.note.reminder === null ? <div> </div> : (
                                <Chip
                                    className='remainder-chip'
                                    label={this.props.note.reminder}
                                    onDelete={this.deleteReminder}
                                    icon={<img className='icon' src={require('../assets/icons/ReminderClock.svg')} alt="" />}
                                    variant='default'
                                />)}</div>
                                <div className='note-labels-div'>
                                {this.props.note.labels.map((label,index)=>{
                                    return <Chip
                                    key={index}
                                    className='remainder-chip'
                                    label={label.labelname.label}
                                    onDelete={this.deleteReminder}
                                    icon={<img className='icon' src={require('../assets/icons/Label.svg')} alt="" />}
                                    variant='default'
                                />
                                })}
                                </div>
                        </CardContent>
                        <div className='note-bottom-icons-div'>
                            <Reminder
                                setReminder={this.setReminder}
                            />


                            <div className='note-icon-div' role='button'>
                                <img src={require('../assets/icons/Collaborator.svg')} alt="" />
                            </div>
                            <ColorPallate setColor={this.handleColor} />
                            <div className='note-icon-div' role='Button'>
                                <img src={require('../assets/icons/AddImage.svg')} alt="" />
                            </div>
                            <div className='note-icon-div' role='Button' onClick={this.handleArchive} >
                                <img
                                    src={(this.props.note.archived === '1')
                                        ? require('../assets/icons/Unarchive.svg')
                                        : require('../assets/icons/Archive.svg')} alt=""
                                />
                            </div>
                            <NoteOptions
                                index={this.props.index}
                                note={this.props.note}
                                handleNoteEdit={this.props.handleNoteEdit}
                                user={this.props.user}
                                handleNoteLabel={this.props.handleNoteLabel}
                                handleDeleteNoteLabel={this.props.handleDeleteNoteLabel}
                            />
                        </div>
                    </Card>
                    <NoteEdit
                        ref={this.noteEdit}
                        note={this.props.note}
                        index={this.props.index}
                        handleNoteEdit={this.props.handleNoteEdit}
                        user={this.props.user}
                        handleNoteLabel={this.props.handleNoteLabel}
                        handleDeleteNoteLabel={this.props.handleDeleteNoteLabel}
                    />
                </MuiThemeProvider>
            </div>
        );
    }
}
