import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';


export default class CAppBar extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            mobileMoreAnchorEl: null,
        };
    }



    handleProfileMenuOpen = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    // handleMenuClose = () => {
    //     this.setState({ anchorEl: null });
    //     this.handleMobileMenuClose();
    // };

    // handleMobileMenuOpen = event => {
    //     this.setState({ mobileMoreAnchorEl: event.currentTarget });
    // };



    // handleMobileMenuClose = () => {
    //     this.setState({ mobileMoreAnchorEl: null });
    // };

    render() {


        return (
            <AppBar style={{ backgroundColor: "white" }}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="Open drawer">
                        <img className='icon' src={require('../assets/icons/menu.svg')} alt="" />
                    </IconButton>
                    <div className='appbar-logo'>
                        <img src={require('../assets/images/logo.svg')} alt="" />
                    </div>
                    <Typography variant="h6">
                        Notes
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
                </Toolbar>
            </AppBar >
            // <AppBar position="static" >
            //     <Toolbar>
            //         <IconButton color="inherit" aria-label="Open drawer">
            //             <img src={require('../assets/icons/menu.svg')} alt="" />
            //         </IconButton>
            //         <Typography variant="h6" noWrap>
            //             Fundoo Notes
            // </Typography>
            //         <div className='appbar-search'>
            //             <span className='icon'><SearchIcon color='action' /></span>
            //             <InputBase
            //                 placeholder="Search…"
            //             />
            //         </div>
            //     </Toolbar>
            // </AppBar>
        );
    }
}
// PrimarySearchAppBar.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

