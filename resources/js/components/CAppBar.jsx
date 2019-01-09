import React from 'react';
import { Button, AppBar, Toolbar, IconButton, Typography, InputBase, Avatar, Card, CardContent, Divider, createMuiTheme, MuiThemeProvider } from '@material-ui/core/';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import axios from 'axios';

const theme = createMuiTheme({
    overrides: {
        MuiPaper: {
            elevation4: {
                boxShadow: '0px 1px darkgrey'
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
            user: this.props.user,
            selectedFile: null,

        };
        this.handleProfileMenu = this.handleProfileMenu.bind(this);
        this.closeProfileMenu = this.closeProfileMenu.bind(this);
    }
    //***************************************************************************************************************** */

    // fileUploadRef;

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

    handleProfilePic = (event) => {

        // debugger;
        this.props.handleProfilePic(event.target.files[0])

    }

    handleProfileButton=()=>{}

    // shouldComponentUpdate(prevprops,nextprops){
    //     // debugger;
    //     console.log('appbar',prevprops,nextprops);
    //     if(this.state.profileMenu===nextprops.profileMenu){

    //         return false;
    //     }
    //     return true ;
    // }

    render() {
        // console.log('capp', this.state);


        return (
            <MuiThemeProvider theme={theme}>
                <div className='appbar-div'>
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
                                {this.props.Page === 'FundooNotes' ? <div className='appbar-logo'>
                                    <img src={require('../assets/images/logo.svg')} alt="" />
                                </div> : ''}

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
                                        <Avatar
                                            src={this.props.user.profilepic === null ?
                                                this.props.user.providerprofile : this.props.user.profilepic}
                                            className='profile-avatar' alt="Remy Sharp"
                                            alt={localStorage.getItem('username').substr(0, 1)} />
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
                                                                <Avatar className='profile-popup-avatar'
                                                                    alt={localStorage.getItem('username').substr(0, 1)}
                                                                    src={this.props.user.profilepic === null ?
                                                                        this.props.user.providerprofile : this.props.user.profilepic} color='red' >
                                                                    {/* {this.props.user.firstname.substr(0, 1)} */}
                                                                </Avatar>
                                                                <div className='profilepic-input-div'>
                                                                    {/* <Button onClick={this.fileUploadRef.click()} >Change</Button> */}
                                                                    <input
                                                                        // style={{display:'none'}}
                                                                        accept='image/*'
                                                                        ref={(ref) => { this.fileUploadRef = ref }}
                                                                        type='file'
                                                                        name='profiepic'
                                                                        placeholder='Change Profile Pic'
                                                                        onChange={this.handleProfilePic}
                                                                    />

                                                                </div>
                                                                {/* <div><Typography className='note-body-text' component="p">change</Typography></div> */}
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
                </div>
            </MuiThemeProvider>
        );
    }
}
// PrimarySearchAppBar.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

