import React from "react";
import { Card } from '@material-ui/core';
import { Button, IconButton, Typography, InputBase, CardActions, CardContent, createMuiTheme, MuiThemeProvider } from '@material-ui/core/';
import Reminder from './Reminder';
import Chip from '@material-ui/core/Chip';
import { red } from "@material-ui/core/colors";
import NoteEdit from './NoteEdit';
import ColorPallate from './ColorPallate';
import NoteOptions from './NoteOptions';
import ImageUpload from './ImageUpload';
import NoteImageDisplay from './NoteImageDisplay';
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
        // MuiPaper: {
        //     // rounded: {
        //     //     borderRadius: 8,
        //     // },
        //     elevation1: {
        //         boxShadow: '0 0 0'
        //     },
        // },
        // MuiCard: {
        //     root: {
        //         overflow: 'inherit'
        //     },
        // },

    }, typography: {
        useNextVariants: true,
    },
    //..MuiPaper-elevation1-252 .MuiCard-root-510  .MuiCardContent-root-276
});


export default class Note extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            mouseShowIcon: false,
            buttonShowIcon: false,
        }
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

    shouldComponentUpdate(nextProps, nextStates) {
        // debugger;
        if (this.props.dashState.drawerOpen !== nextProps.dashState.drawerOpen) {

            return false;
        }

        if (this.props.dashState.search !== nextProps.dashState.search) {

            return false;
        }



        if (this.props.dashState.searchBarStatus !== nextProps.dashState.searchBarStatus) {
            return false;
        }

        return true;
    }


    editNote = () => {
        console.log("lelelelelel");

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
        // debugger;
        let tempNote = this.props.note;
        // debugger;
        // console.log(this.props.note);

        tempNote.archived = (tempNote.archived === '0') ? '1' : '0';
        this.props.handleNoteEdit(this.props.index, tempNote);
        tempNote.archived === '0' ? this.props.notify('Note Unarchived') : this.props.notify('Note Archived');
    }

    /**
     * function to handle the start of the drag
     */
    handleDragStart = (e) => {
        if (this.props.dashState.dragNote !== this.props.index) {
            this.props.handleSetDragNote(this.props.index);
        }
        //perventin default will stop the dragging of the item
        // e.preventDefault();
        e.dataTransfer.setData('index', this.props.index);
        e.target.display = 'hidden';

    }

    handleDragOver = (e) => {
        e.preventDefault();
        if (this.props.dashState.dragNote === this.props.index) {
            return;
        }
        e.preventDefault();
        this.props.handleSetDragNote(this.props.index);
        var ss = event.dataTransfer.getData('text')
        // e.dataTransfer.dropEffect = "move"
        this.props.noteDrop(this.props.index);

    }
    handleDrop = (e) => {
        
        var ss = event.dataTransfer.getData('index')
        console.log('droppppppppppp',ss,this.props.index);
        this.props.handlePosition(ss,this.props.index);
    }

    /**
     * 
     */
    handleMouseOver = () => {
        if (this.state.mouseShowIcon !== true) {
            this.setState({
                mouseShowIcon: true,
            });
        }
    }

    handleMouseLeave = () => {
        this.setState({
            mouseShowIcon: false,
        });

    }

    /**
     * 
     */
    handleButtonShow = () => {
        this.setState({
            buttonShowIcon: true,
        });
    }

    /**
     * 
     */
    handleButtonHide = () => {
        this.setState({
            buttonShowIcon: false,
        });
    }

    /**
     * 
     */
    handleImageUpload = (file) => {
        // debugger;
        this.props.handleImageUpload(file, this.props.index);
    }

    /**
     * 
     */
    handleImageDelete = (imageid) => {
        this.props.handleImageDelete(this.props.index, imageid);
    }

    render() {
        // console.log('note'+this.props.index,this.props)
        return (

            <div
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseLeave}
                draggable
                onDragStart={this.handleDragStart}
                onDragOver={(e) => this.handleDragOver(e)}
                onDrop={(e) => this.handleDrop(e)}
                className={this.props.gridView === true ? 'note-card-grid' : 'note-card'}>



                <Card className='note-card-def' style={{ position: 'relative', border: '1px solid #dadce0', backgroundColor: this.props.note.color }} >
                    <div className='note-images-div'  >
                        <NoteImageDisplay
                            handleImageDelete={this.handleImageDelete}
                            editNote={this.editNote}
                            images={this.props.note.images} />
                    </div>
                    <div className='note-icon-pin' role='button' onClick={this.handlePin} >
                        <img src={(this.props.note.pinned === '1') ? require('../assets/icons/pin.svg') : require('../assets/icons/unpin.svg')} alt="" />
                    </div>

                    <MuiThemeProvider theme={theme}>
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
                                {this.props.note.labels.map((label, index) => {
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
                    </MuiThemeProvider>
                    <div className='note-bottom-icons-div' style={(this.state.mouseShowIcon || this.state.buttonShowIcon) ? {} : { opacity: 0 }} >
                        <Reminder
                            handleButtonShow={this.handleButtonShow}
                            handleButtonHide={this.handleButtonHide}
                            setReminder={this.setReminder}
                        />


                        <div className='note-icon-div' role='button'>
                            <img src={require('../assets/icons/Collaborator.svg')} alt="" />
                        </div>
                        <ColorPallate
                            setColor={this.handleColor}
                            handleButtonShow={this.handleButtonShow}
                        />
                        <ImageUpload
                            handleImageUpload={this.handleImageUpload} />
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
                            handleButtonShow={this.handleButtonShow}
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
                    handleImageUpload={this.props.handleImageUpload}
                    handleImageDelete={this.props.handleImageDelete}
                />

            </div>
            // </Draggable>
        );
    }
}
