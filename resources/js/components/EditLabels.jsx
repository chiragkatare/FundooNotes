
import React from 'react';
import { InputBase, List, ListItem, ClickAwayListener, Dialog, ListItemIcon, ListItemText } from '@material-ui/core/';
import LabelComp from './LabelComp';

export default class EditLabels extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            open: false,
            createNew: false,
            newLabel: '',
        }
    }

    handleClickEditLabels = () => {
        this.setState({
            open: !this.state.open,
        });
    }

    handleInputClick = () => {
        this.setState({
            createNew: true,
        });
    }

    handleInputClickAway = () => {
        this.setState({
            createNew: false,
        });
    }

    handleInputChange = (e) => {
        this.setState({
            newLabel: e.target.value,
        });
    }

    handleNewLabel = () => {
        if (this.state.newLabel !== '') {
            this.props.handleNewLabel(this.state.newLabel);
            this.setState({
                newLabel: ''
            });
        }
    }

    handleDeleteLabel = (label, index) => {
        // debugger;
        this.props.handleDeleteLabel(label.id, index)
    }

    render() {
        console.log('editlabel', this.state);

        const { fullScreen } = this.props;
        var labels = this.props.user.labels.map((label, index) => {
            return <LabelComp
                handleDeleteLabel={this.handleDeleteLabel}
                index={index}
                key={index}
                handleEditLabel={this.props.handleEditLabel}
                label={label}
            />
        })
        return (
            <div>
                <div className={this.props.Page === 'Edit Labels' ? 'sidedrawer-list-selected' : 'sidedrawer-list'} onClick={this.handleClickEditLabels} >
                    <ListItem >
                        <ListItemIcon><img src={require('../assets/icons/EditLabels.svg')} alt="" /></ListItemIcon>
                        <ListItemText primary='Edit Labels' />
                    </ListItem>
                </div>

                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClickEditLabels}
                    aria-labelledby="responsive-dialog-title"
                >
                    <div className='edit-labels-diag-div'>
                        <div className='edit-labels-diag-heading'>
                            Edit Labels
                 </div>
                        <ClickAwayListener
                            onClickAway={this.handleInputClickAway}
                        >
                            <div className='edit-note-diag-createlabel' >
                                {this.state.createNew ?
                                    <img className='icon' src={require('../assets/icons/close.svg')} alt="" style={{ width: 18 }} onClick={this.handleInputClickAway} />
                                    : <img className='icon' src={require('../assets/icons/PlusSign.svg')} alt="" />}
                                <InputBase onClick={this.handleInputClick}
                                    className='create-new-label'
                                    fullWidth
                                    value={this.state.newLabel}
                                    placeholder="Create new label"
                                    onChange={this.handleInputChange}
                                />
                                {this.state.createNew ?
                                    <img
                                        className='icon'
                                        src={require('../assets/icons/Oktick.svg')}
                                        alt=""
                                        onClick={this.handleNewLabel} />
                                    : ''}
                            </div>
                        </ClickAwayListener>
                        {labels}

                    </div>

                </Dialog>
            </div>
        );
    }
}

