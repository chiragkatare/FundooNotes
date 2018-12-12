import Drawer from '@material-ui/core/Drawer';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import { Component } from 'react';
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                top: 64,
                width: 270,
            }
        }
    }, typography: {
        useNextVariants: true,
    },
    // .MuiDrawer-paper-107
})

export default class SideDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
        }
    }


    render() {

        var list = (
            <List component="nav">
                <ListItem button>
                    <ListItemIcon><img src={require('../assets/icons/NotesBulb.svg')} alt="" /></ListItemIcon>
                    <ListItemText primary='Notes' />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><img src={require('../assets/icons/Reminder.svg')} alt="" /></ListItemIcon>
                    <ListItemText primary='Reminder' />
                </ListItem>
                <Divider />
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