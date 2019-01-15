import React from 'react';

export default class Snackbars extends React.Component {

    state = {
        open: false,
        messageInfo: {},
    };

    handleImageClick = () => {
        this.fileInput.click();
    }

    handleNotePic = (e) => {

        this.props.handleImageUpload(e.target.files[0]);
    }

    render() {
        return (
            <div>
                <div className='note-icon-div' role='Button' onClick={this.handleImageClick} >
                    <img src={require('../assets/icons/AddImage.svg')} alt="" />
                </div>
                <input

                    style={{ display: 'none' }}
                    accept='image/*'
                    ref={fileInput => this.fileInput = fileInput}
                    type='file'
                    name='profiepic'
                    placeholder='Change Profile Pic'
                    onChange={this.handleNotePic}
                />
            </div>
        );
    }
}



