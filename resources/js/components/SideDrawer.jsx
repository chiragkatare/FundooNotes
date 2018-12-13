import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { Divider, List, ListItem, Typography, ListItemIcon, ListItemText } from '@material-ui/core/';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                top: 66,
                width: 270,
            }
        }
    }, typography: {
        useNextVariants: true,
    },
    // .MuiDrawer-paper-107
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
                <ListItem button>
                    <ListItemIcon><img src={require('../assets/icons/NotesBulb.svg')} alt="" /></ListItemIcon>
                    <ListItemText primary='Notes' />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><img src={require('../assets/icons/Reminder.svg')} alt="" /></ListItemIcon>
                    <ListItemText primary='Reminder' />
                </ListItem>
                <Divider />
                <Typography >
                    Label
                </Typography>
                <ListItem button>
                    <ListItemIcon><img src={require('../assets/icons/EditLabels.svg')} alt="" /></ListItemIcon>
                    <ListItemText primary='Edit Labels' />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><img src={require('../assets/icons/Archive.svg')} alt="" /></ListItemIcon>
                    <ListItemText primary='Archive' />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemIcon><img src={require('../assets/icons/Bin.svg')} alt="" /></ListItemIcon>
                    <ListItemText primary='Bin' />
                </ListItem>
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