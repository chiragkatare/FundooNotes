import React from 'react';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import { Typography } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

export default class Reminder extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            custom: false,
            anchorEl: null,
        };
    }

    /**
     * function to get the custom date of the reminder and set it in the notes
     * 
     * */
    customDate = (event) => {
        var reminder = moment(event.target.value).format('DD MMM YYYY , h:mm a');
        console.log('remnder', reminder);

        this.props.setReminder(reminder);
    }

    handleReminder = (event) => {
        this.setState({
            active: !this.state.active,
        });
    }

    handleClickAway = () => {
        this.setState({
            active: false,
        });
    }

    handleCustom = (event) => {
        const { currentTarget } = event;
        this.setState({
            custom: !this.state.custom,
            anchorEl: currentTarget,
        });
    }

    handleToday = () => {
        var d = new Date();
        var date = d.getDate();
        var year = d.getFullYear();
        var month = d.getMonth();

        var s = moment(new Date(year, month, date, 8)).format('DD MMM YYYY , h:mm a');
        this.props.setReminder(s);
    }

    handleTomorrow = () => {
        var d = new Date();
        var date = d.getDate();
        var year = d.getFullYear();
        var month = d.getMonth();
        d = new Date(year, month, date + 1, 8);
        var s = moment(d).format('DD MMM YYYY , h:mm a');
        this.props.setReminder(s);
    }

    render() {
        

        return (
            <div >
                <ClickAwayListener onClickAway={this.handleClickAway} >
                    <div>
                        <div className='note-icon-div' role='Button' onClick={this.handleReminder} >
                            <img src={require('../assets/icons/RemindMe.svg')} alt="" />
                        </div>
                        <div >
                            <Popper className='reminder-popper' style={{position:'fixed'}} open={this.state.active} transition disablePortal
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >

                                        <Paper>
                                            <MenuList>
                                                <Typography align='center'>Reminder:</Typography>
                                                <MenuItem onClick={this.handleToday} >Later Today</MenuItem>
                                                <MenuItem onClick={this.handleTomorrow} >Tommorow</MenuItem>
                                                <MenuItem onClick={this.handleCustom} >Custom</MenuItem>
                                                <Popper open={this.state.custom} anchorEl={this.state.anchorEl} transition disablePortal
                                                    placement={'right-end'}
                                                >
                                                    {({ TransitionProps, placement }) => (
                                                        <Grow
                                                            {...TransitionProps}
                                                            style={{ transformOrigin: 'center bottom' }}
                                                        >
                                                            <Paper>
                                                                <MenuList>

                                                                    <MenuItem  ><TextField
                                                                        onChange={this.customDate}
                                                                        id="datetime-local"
                                                                        label="Select date"
                                                                        type="datetime-local"

                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                    /></MenuItem>

                                                                </MenuList>
                                                            </Paper>
                                                        </Grow>
                                                    )}
                                                </Popper>
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