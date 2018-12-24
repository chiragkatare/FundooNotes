import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// const styles = theme => ({
//   close: {
//     padding: theme.spacing.unit / 2,
//   },
// });

export default class Snackbars extends React.Component {
  queue = [];

  state = {
    open: false,
    messageInfo: {},
  };

  handleNewMessage = message => {
    // debugger;
    this.queue.push({
      message,
      key: new Date().getTime(),
    });

    if (this.state.open) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({ open: false });
    } else {
      this.processQueue();
    }
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true,
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  handleExited = () => {
    this.processQueue();
  };

  render() {

    const { messageInfo } = this.state;

    return (
      <div>

        <Snackbar
          key={messageInfo.key}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          onExited={this.handleExited}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{messageInfo.message}</span>}
          action={[
            // <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>

            // </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"

              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

// Snackbars.propTypes = {
//   classes: PropTypes.object.isRequired,
// };


