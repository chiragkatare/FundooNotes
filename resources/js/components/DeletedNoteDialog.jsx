import React from 'react';
import Reminder from '../components/Reminder';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import ColorPallate from './ColorPallate';
import { InputBase, DialogTitle, Typography, DialogContent, DialogActions, Dialog, createMuiTheme, MuiThemeProvider } from '@material-ui/core/';
// import Draggable from 'react-draggable';
import NoteOptions from './NoteOptions';


const theme = createMuiTheme({
    overrides: {
        MuiChip: {
            label: {
                fontSize: '0.81 rem'
            },
            root: {
                height: 26
            }
        }, MuiDialogContent: {
            root: {
                padding: '0px 12px 6px',
            }
        },
        MuiDialogTitle: {
            root: {
                padding: '8px 12px 0px',

            },
        },
        MuiDialog:
        {
            paperWidthSm: {
                width: '550px',
            }
        },
        MuiPaper: {
            rounded: {
                borderRadius: 8,
            }
        },

    }, typography: {
        useNextVariants: true,
    },
    // MuiChip-label-408  .MuiPaper-rounded-1165  .MuiDialogTitle-root-1429  padding: 0px 12px 6px;
});


export default class NoteEdit extends React.Component {
    state = {
        open: false,
        index: this.props.index,
        note: this.props.note,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        // debugger;
        this.setState({ open: false });
    };

    handleEdit = () => {
        this.props.notify("Can’t edit in Recycle Bin");
    }


    render() {
        const { fullScreen } = this.props;
        // console.log('edit', this.state);



        return (
            <div>
                <MuiThemeProvider theme={theme}>

                    <Dialog
                        fullScreen={fullScreen}
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <div style={{ background: this.state.note.color }}>
                            <DialogTitle onClick={this.handleEdit} >
                                <Typography variant='h6' component="p">
                                    {this.props.note.title}
                                </Typography>
                            </DialogTitle>
                            <DialogContent onClick={this.handleEdit} >
                                <InputBase
                                    name='body'
                                    multiline
                                    fullWidth
                                    value={this.props.note.body}
                                />
                                <div className='note-chip-div'>{(this.state.note.reminder === null || this.state.note.reminder === '') ? ('') :
                                    (
                                        <Chip
                                            label={this.state.note.reminder}
                                            className='remainder-chip'
                                            icon={<img className='icon' src={require('../assets/icons/ReminderClock.svg')} alt="" />}
                                            variant='default'
                                        />)}</div>
                            </DialogContent>
                            <DialogActions>
                                <div className='takenote-bottom-icons-div'>

                                    <NoteOptions
                                        note={this.props.note}
                                        handleNoteEdit={this.props.handleNoteEdit}
                                        index={this.props.index}
                                        handleNoteDelete = {this.props.handleNoteDelete}
                                        user={this.props.user}
                                        handleNoteEdit={this.props.handleNoteEdit}
                                        handleNoteLabel={this.props.handleNoteLabel}
                                        />
                                    <Button className='card-button-close' component="span" onClick={(this.handleClose)}>
                                        Close
                                    </Button>
                                </div>
                            </DialogActions>
                        </div>
                    </Dialog>

                </MuiThemeProvider>
            </div>
        );
    }
}
