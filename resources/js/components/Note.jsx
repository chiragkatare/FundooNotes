import React from "react";
import { Card } from '@material-ui/core';
import { Button, IconButton, Typography, InputBase, CardActions, CardContent ,createMuiTheme, MuiThemeProvider} from '@material-ui/core/';
import Reminder from './Reminder';
import Chip from '@material-ui/core/Chip';
import { red } from "@material-ui/core/colors";
// import Moment from 'react-moment';


/**
 * theme for material ui to override the defaults
 * 
 */
const theme = createMuiTheme({
    overrides: {
        MuiCardContent: {
            root: {
                paddingTop:6,
                paddingBottom:6,
            }
        },
        MuiPaper:{
            rounded:{
                borderRadius:8,
            },
            elevation1:{
                boxShadow:'0 0 0'
            }, 
        },

    }, typography: {
        useNextVariants: true,
    },
    //..MuiPaper-elevation1-252
});


export default class Note extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            reminder: null,
            reminderstatus: true,
        };
    }

    /**
     * LIFECYCLE METHOD
     * Called Automatically
     * runs before mounting of the component
     */
    componentWillMount() {
        this.setState({
            title: this.props.title,
            body: this.props.body,
            reminder:this.props.reminder,
        })
    }

    render() {
        return (
            <div className={this.props.gridView===true?'note-card-grid':'note-card'}>
            <MuiThemeProvider theme={theme}>
                <Card style={{border:'1px solid #dadce0'}} >
                    <CardContent>
                        <Typography  component="p">
                            {this.state.title}
                        </Typography>
                        <Typography component="p">
                            {this.state.body}
                        </Typography>
                        <div className='note-card-chip-div' >{this.state.reminder === null ? <div> </div> : (<Chip
                            className = 'remainder-chip'
                            label={this.state.reminder}
                            onDelete={this.deleteReminder}
                            icon={<img className='icon' src={require('../assets/icons/ReminderClock.svg')} alt="" />}
                            variant='default'
                        />)}</div>
                    </CardContent>
                    <div className='note-bottom-icons-div'>
                        <Reminder />

                      
                        <div className='note-icon-div' role='button'>
                            <img src={require('../assets/icons/Collaborator.svg')} alt="" />
                        </div>
                        <div className='note-icon-div' role='Button'>
                            <img src={require('../assets/icons/ColorPallate.svg')} alt="" />
                        </div>
                        <div className='note-icon-div' role='Button'>
                            <img src={require('../assets/icons/AddImage.svg')} alt="" />
                        </div>
                        <div className='note-icon-div' role='Button'>
                            <img src={require('../assets/icons/Archive.svg')} alt="" />
                        </div>
                        <div className='note-icon-div' role='Button'>
                            <img src={require('../assets/icons/More.svg')} alt="" />
                        </div>
                    </div>
                </Card>
                </MuiThemeProvider>
            </div>
        );
    }
}
