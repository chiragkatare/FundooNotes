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

    if(this.props.images.length===0){
      return null;
    }
    return (
      <div>
        {this.props.images.map((image,index)=>{
          return <img key={index} draggable="false" className='note-images' src={image.pic} alt="o,o" />
        })}
        {/* {this.props.note.images.length === 0 ? '' : } */}
        </div>
    );
  }
}
{/* <div className='note-images-div' ></div> */}
// Snackbars.propTypes = {
//   classes: PropTypes.object.isRequired,
// };




