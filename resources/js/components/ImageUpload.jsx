import React from 'react';

// const styles = theme => ({
//   close: {
//     padding: theme.spacing.unit / 2,
//   },
// });

export default class Snackbars extends React.Component {

    state = {
        open: false,
        messageInfo: {},
    };


    render() {
        return (
            <div className='note-icon-div' role='Button'>
                <img src={require('../assets/icons/AddImage.svg')} alt="" />
            </div>
        );
    }
}

// Snackbars.propTypes = {
//   classes: PropTypes.object.isRequired,
// };


