import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Avatar } from '@material-ui/core/';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';



export default class CAppBar extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            heading: 'FundooNotes',
            anchorEl: null,
            mobileMoreAnchorEl: null,
            profileMenu:true,
        };
        this.handleProfileMenu=this.handleProfileMenu.bind(this);
    }



    handleProfileMenu= (event) => {
        this.setState({ anchorEl: event.currentTarget,
            profileMenu:!this.state.profileMenu, 
        });
        console.log('avatar',this.state);
        
    };


    render() {


        return (
            <AppBar style={{ backgroundColor: "white" }}>
                <Toolbar>
                    <IconButton color="inherit" onClick={this.props.menuClick} >
                        <img className='icon' src={require('../assets/icons/menu.svg')} alt="" />
                    </IconButton>
                    <div className='appbar-logo'>
                        <img src={require('../assets/images/logo.svg')} alt="" />
                    </div>
                    <Typography className='appbar-heading' variant="h6">
                        {this.state.heading}
                    </Typography>
                    <div className='appbar-search'>
                        <IconButton>
                            <img className='icon' src={require('../assets/icons/search.svg')} alt="" />
                        </IconButton>

                        <InputBase
                            fullWidth
                            placeholder="Search…"
                        />
                        <IconButton>
                            <img className='icon' src={require('../assets/icons/close.svg')} alt="" />
                        </IconButton>

                    </div>
                    <IconButton>
                        <img className='icon' src={require('../assets/icons/refresh.svg')} alt="" />
                    </IconButton>
                    <IconButton>
                        <img className='icon' src={require('../assets/icons/grid.svg')} alt="" />
                    </IconButton>
                    <IconButton>
                        <img className='icon' src={require('../assets/icons/setting.svg')} alt="" />
                    </IconButton>
                    <div className='appbar-avatar-btn'>
                    <ClickAwayListener onClickAway={this.handleProfileMenu} >
                        <IconButton onClick={this.handleProfileMenu} >
                            <Avatar alt="Remy Sharp" src={require('../assets/images/avatar.jpg')} />
                        </IconButton>
                        </ClickAwayListener>
                        <Popper open={this.state.profileMenu}  transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                    <Paper>
                                        
                                            <MenuList>
                                                <MenuItem >Profile</MenuItem>
                                                <MenuItem >My account</MenuItem>
                                                <MenuItem >Logout</MenuItem>
                                            </MenuList>
                                        
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>
                </Toolbar>
            </AppBar >
        );
    }
}
// PrimarySearchAppBar.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

