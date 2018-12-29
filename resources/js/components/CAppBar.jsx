import React from 'react';
import { Button, AppBar, Toolbar, IconButton, Typography, InputBase, Avatar, Card, CardContent, Divider,createMuiTheme,MuiThemeProvider } from '@material-ui/core/';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


const theme = createMuiTheme({
    overrides: {
        MuiPaper:{
            elevation4:{
                boxShadow:'0px 1px darkgrey'
            }
        }
    }, typography: {
        useNextVariants: true,
    },
    // .MuiDrawer-paper-107 .MuiPaper-elevation4-16 .MuiDrawer-paperAnchorDockedLeft-112
})


export default class CAppBar extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            heading: this.props.Page,
            anchorEl: null,
            mobileMoreAnchorEl: null,
            profileMenu: false,
            user:this.props.user,

        };
        this.handleProfileMenu = this.handleProfileMenu.bind(this);
        this.closeProfileMenu = this.closeProfileMenu.bind(this);
    }

    /**
     * method to close the profile menu on
     */
    closeProfileMenu() {
        this.setState({
            anchorEl: event.currentTarget,
            profileMenu: false,
        });
    }

    /**
     * method to close or open the profile menu on click of a button
     * 
     * @var event
     */
    handleProfileMenu = (event) => {
        this.setState({
            anchorEl: event.currentTarget,
            profileMenu: !this.state.profileMenu,
        });
        // console.log('avatar', this.state);

    };

    render() {
        // console.log('capp', this.state);


        return (
            <MuiThemeProvider theme={theme}>
            <AppBar  
            style={{ backgroundColor: "white" }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        onClick={this.props.menuClick}
                    >
                        <img className='icon' src={require('../assets/icons/menu.svg')} alt="" />
                    </IconButton>
                    <div className='appbar-heading-div' >
                    {this.props.Page==='FundooNotes'?<div className='appbar-logo'>
                        <img src={require('../assets/images/logo.svg')} alt="" />
                    </div>:''}
                    
                    <Typography className='appbar-heading' variant="h6">
                        {this.props.Page}
                    </Typography>
                    </div>
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
                    <div className='appbar-divbutton'>
                        <IconButton>
                            <img className='icon' src={require('../assets/icons/refresh.svg')} alt="" />
                        </IconButton >
                        <IconButton className='appbar-iconbutton-grid' onClick={this.props.changeView}>
                            <img className='icon' src={this.props.gridView === true ? require('../assets/icons/Grid.svg') : require('../assets/icons/List.svg')} alt="" />
                        </IconButton>
                        <IconButton>
                            <img className='icon' src={require('../assets/icons/setting.svg')} alt="" />
                        </IconButton>
                    </div>
                    <ClickAwayListener onClickAway={this.closeProfileMenu} >
                    <div className='appbar-avatar-btn'>
                        
                            <IconButton onClick={this.handleProfileMenu} >
                                <Avatar className='profile-avatar' alt="Remy Sharp" >
                                {localStorage.getItem('username').substr(0, 1)}
                                </Avatar>
                            </IconButton>
                        <div className='check'>
                            <Popper className='appbar-menu-profile' open={this.state.profileMenu} anchorEl={this.state.anchorEl} transition disablePortal placement='bottom-end'>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: 'center top' }}
                                    >
                                        <Card>
                                            <CardContent className='profile-popper-cardcontent' >
                                                <div className='inside-avatar-div'>
                                                    <Avatar className='profile-popup-avatar' color='red' >
                                                        {this.props.user.firstname.substr(0, 1)}
                                                    </Avatar>
                                                </div>
                                                <div>
                                                    <Typography variant='h6' component="p" >

                                                        {this.props.user.firstname + ' ' + this.props.user.lastname}
                                                    </Typography>
                                                    <Typography component="p" >
                                                        {this.props.user.email}
                                                    </Typography>
                                                </div>
                                            </CardContent>
                                            <Divider />
                                            <div className='profile-popper-below-div'>
                                                <Button variant='outlined' onClick={this.props.logout}>
                                                    LogOut
                                        </Button>
                                            </div>

                                        </Card>
                                    </Grow>
                                )}
                            </Popper>
                        </div>
                    </div>
                    </ClickAwayListener>
                </Toolbar>
            </AppBar >
            </MuiThemeProvider>
        );
    }
}
// PrimarySearchAppBar.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

