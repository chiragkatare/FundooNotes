import React from 'react';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

export default class NoteOptions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            custom: false,
            anchorEl: null,
        };
    }



    handleClickAway = () => {
        this.setState({
            active: false,
        });
    }

    handleClick=()=>{
        this.setState({
            active: !this.state.active,
        });
    }



    render() {


        return (
            <div >
                <ClickAwayListener onClickAway={this.handleClickAway} >
                    <div>
                        <div className='note-icon-div' role='Button' onClick={this.handleClick}>
                            <img src={require('../assets/icons/More.svg')} alt="" />
                        </div>

                        <div >
                            <Popper className='reminder-popper' style={{ position: 'fixed' }} open={this.state.active} transition disablePortal
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >

                                        <Paper>
                                            <MenuList>
                                                <Typography align='center'>Delete Note</Typography>
                                                <Typography align='center'>Copy Note</Typography>
                                                
                                            </MenuList>
                                        </Paper>

                                    </Grow>
                                )}
                            </Popper>
                        </div>
                    </div>
                </ClickAwayListener>
            </div>
        );
    }
}