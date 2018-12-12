import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Avatar } from '@material-ui/core/';



export default class CAppBar extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            heading: 'FundooNotes',
            anchorEl: null,
            mobileMoreAnchorEl: null,
        };
       
    }

  

    handleProfileMenuOpen = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };


    render() {


        return (
            <AppBar style={{ backgroundColor: "white" }}>
                <Toolbar>
                    <IconButton color="inherit"  onClick={this.props.menuClick} >
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
                        <IconButton  >
                            <Avatar alt="Remy Sharp" src={require('../assets/images/avatar.jpg')} />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar >
        );
    }
}
// PrimarySearchAppBar.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

