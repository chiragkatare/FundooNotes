import React from "react";
import { Card } from '@material-ui/core';
import { Button, IconButton, Typography, InputBase, CardActions, CardContent, createMuiTheme, MuiThemeProvider } from '@material-ui/core/';
import DeletedNoteDialog from './DeletedNoteDialog';
import Chip from '@material-ui/core/Chip';
import NoteEdit from './NoteEdit';
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


export default class Note extends React.Component {


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


    render() {
        // console.log('note'+this.props.index,this.props)
        return (
            <div className={this.props.gridView === true ? 'note-card-grid' : 'note-card'}>
                <MuiThemeProvider theme={theme}>

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

                                    icon={<img className='icon' src={require('../assets/icons/ReminderClock.svg')} alt="" />}
                                    variant='default'
                                />)}</div>
                        </CardContent>
                        <div className='deletednote-bottom-icons-div'>
                            <NoteOptions
                                index={this.props.index}
                                note={this.props.note}
                                handleNoteEdit={this.props.handleNoteEdit}
                                handleNoteDelete={this.props.handleNoteDelete}
                            />
                        </div>
                    </Card>
                    <DeletedNoteDialog
                        notify={this.props.notify}
                        ref={this.noteEdit}
                        note={this.props.note}
                        index={this.props.index}
                        handleNoteEdit={this.props.handleNoteEdit}
                        handleNoteDelete={this.props.handleNoteDelete}
                    />
                </MuiThemeProvider>
            </div>
        );
    }
}
