import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { Divider, List, ListItem, Typography, ListItemIcon, ListItemText } from '@material-ui/core/';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                top: 65,
                width: 270,
            },
            paperAnchorDockedLeft: {
                borderRight: 0,
            }
        }
    }, typography: {
        useNextVariants: true,
    },
    // .MuiDrawer-paper-107  .MuiDrawer-paperAnchorDockedLeft-112
})

export default class SideDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
        }
    }

    render() {

        var list = (
            <List component="nav">
                <div className='sidebar-block-div' >
                    <div className={this.props.Page === 'FundooNotes' ? 'sidedrawer-list-selected' : 'sidedrawer-list'} role='button' onClick={() => this.props.handlePage('FundooNotes')}>
                        <ListItem  >
                            <ListItemIcon><img src={require('../assets/icons/NotesBulb.svg')} alt="" /></ListItemIcon>
                            <ListItemText primary='Notes' />
                        </ListItem>
                    </div>
                    <div className={this.props.Page === 'Reminder' ? 'sidedrawer-list-selected' : 'sidedrawer-list'} onClick={() => this.props.handlePage('Reminder')}>
                        <ListItem >
                            <ListItemIcon><img src={require('../assets/icons/Reminder.svg')} alt="" /></ListItemIcon>
                            <ListItemText primary='Reminder' />
                        </ListItem>
                    </div>
                </div>
                <Divider />
                <div className='sidebar-block-div' >
                    <Typography className='sidebar-labels' variant='h6' component='p' >
                        Labels
                    </Typography>
                    <div className={this.props.Page === 'Edit Labels' ? 'sidedrawer-list-selected' : 'sidedrawer-list'} >
                        <ListItem >
                            <ListItemIcon><img src={require('../assets/icons/EditLabels.svg')} alt="" /></ListItemIcon>
                            <ListItemText primary='Edit Labels' />
                        </ListItem>
                    </div>
                </div>
                <Divider />
                <div className='sidebar-block-div' >
                    <div className={this.props.Page === 'Archive' ? 'sidedrawer-list-selected' : 'sidedrawer-list'} onClick={() => this.props.handlePage('Archive')}>
                        <ListItem>
                            <ListItemIcon><img src={require('../assets/icons/Archive.svg')} alt="" /></ListItemIcon>
                            <ListItemText primary='Archive' />
                        </ListItem>
                    </div>
                    <div className={this.props.Page === 'Bin' ? 'sidedrawer-list-selected' : 'sidedrawer-list'} onClick={() => this.props.handlePage('Bin')} >
                        <ListItem >
                            <ListItemIcon><img src={require('../assets/icons/Bin.svg')} alt="" /></ListItemIcon>
                            <ListItemText primary='Bin' />
                        </ListItem>
                    </div>
                </div>
            </List>
        );

        return (
            <div  >
                <MuiThemeProvider theme={theme}>
                    <Drawer variant='persistent' open={this.props.open} id='side-drawer' >
                        {list}
                    </Drawer>
                </MuiThemeProvider>
            </div>
        );
    }
}