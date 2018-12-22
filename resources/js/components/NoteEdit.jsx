import React from 'react';
import Reminder from '../components/Reminder';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

import { InputBase, DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog, createMuiTheme, MuiThemeProvider } from '@material-ui/core/';
// import Draggable from 'react-draggable';
import withMobileDialog from '@material-ui/core/withMobileDialog';




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
          width:'550px',
        }
      },
      MuiPaper:{
        rounded:{
          borderRadius: 8
        }
      },

  }, typography: {
    useNextVariants: true,
  },
  // MuiChip-label-408  .MuiPaper-rounded-1165  .MuiDialogTitle-root-1429  padding: 0px 12px 6px;
});

export default class ResponsiveDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    // debugger;
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;
    console.log('edit', this.state);


    return (
      <div>
        <MuiThemeProvider theme={theme}>

          <Dialog

            fullScreen={fullScreen}
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle><InputBase name='title' fullWidth placeholder='Title' defaultValue={this.props.note.title} /></DialogTitle>
            <DialogContent>
            <InputBase name='body' multiline fullWidth defaultValue={this.props.note.body}  />
              <div className='note-chip-div'>{this.props.note.reminder === null ? ('') : (<Chip
                label={this.props.note.reminder}
                // onDelete={this.deleteReminder}
                icon={<img className='icon' src={require('../assets/icons/ReminderClock.svg')} alt="" />}
                variant='default'
              />)}</div>
            </DialogContent>
            <DialogActions>
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
            </DialogActions>
          </Dialog>

        </MuiThemeProvider>
      </div>
    );
  }
}
