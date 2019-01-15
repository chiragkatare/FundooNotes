import React from 'react';

// const styles = theme => ({
//   close: {
//     padding: theme.spacing.unit / 2,
//   },
// });

export default class NoteImageDisplay extends React.Component {
  queue = [];

  state = {
    open: false,
    messageInfo: {},
  };



  render() {

    if (this.props.images.length === 0) {
      return null;
    }
    return (
      <div  >
        {this.props.images.map((image, index) => {
          return <div className='note-image-div' key={index} style={{ position: 'relative' }} >
            <div className='note-icon-images-delete' role='button' onClick={()=>this.props.handleImageDelete(image.id)} >
              <img style={{ padding: 3 }} src={require('../assets/icons/DeleteSolid.svg')} alt="" />
            </div>
            <img onClick={this.props.editNote} draggable="false" className='note-images' src={image.pic} alt="o,o" />
          </div>
        })}
        {/* {this.props.note.images.length === 0 ? '' : } */}
      </div>
    );
  }
}
{/* <div className='note-images-div' ></div> */ }
// Snackbars.propTypes = {
//   classes: PropTypes.object.isRequired,
// };




