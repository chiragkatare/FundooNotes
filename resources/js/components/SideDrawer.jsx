import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { Divider, List, ListItem, Typography, ListItemIcon, ListItemText } from '@material-ui/core/';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import EditLabels from './EditLabels'

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

    shouldComponentUpdate(nextProps,nextStates){
        // console.log('shoudkdl',nextProps,nextStates)
        if(this.props.dashState.searchBarStatus!==nextProps.dashState.searchBarStatus){
            return false;
        }
        if(this.props.dashState.gridView!==nextProps.dashState.gridView){
            return false;
        }

        if(this.props.dashState.search!==nextProps.dashState.search){

            return false;
        }

        
        return true;
    }

    render() {

        // console.log('hshdhsd',this.props.user);

        var labels = this.props.user===null?'': this.props.user.labels.map((label,index) => {
            return <div key = {index} className={this.props.Page === label.label ? 'sidedrawer-list-selected' : 'sidedrawer-list'} onClick={() => this.props.handlePage(label.label)}>
                <ListItem  >
                    <ListItemIcon><img src={require('../assets/icons/Label.svg')} alt="" /></ListItemIcon>
                    <ListItemText primary={label.label} />
                </ListItem>
            </div>
        })

        // console.log('labels',labels);

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
                    <Typography className='sidebar-labels'  component='p' >
                        LABELS
                    </Typography>
                    {labels}
                   <EditLabels
                   handleNewLabel = {this.props.handleNewLabel}
                   handleDeleteLabel={this.props.handleDeleteLabel}
                   handleEditLabel={this.props.handleEditLabel}
                   user = {this.props.user}
                   />
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