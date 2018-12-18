import React from "react";
import { Card } from '@material-ui/core';
import { Button, IconButton, Typography, InputBase, CardActions, CardContent } from '@material-ui/core/';
import Reminder from './Reminder';
import Chip from '@material-ui/core/Chip';
// import Moment from 'react-moment';


export default class NotesGrid extends React.Component {

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
            <div className='note-card-grid'>
                <Card >
                    <CardContent>
                        <Typography variant='h6' component="p">
                            {this.state.title}
                        </Typography>
                        <Typography component="p">
                            {this.state.body}
                        </Typography>
                        <div>{this.state.reminder === null ? ('') : (<Chip
                            label={this.state.reminder}
                            onDelete={this.deleteReminder}
                            icon={<img className='icon' src={require('../assets/icons/ReminderClock.svg')} alt="" />}
                            variant='default'
                        />)}</div>
                    </CardContent>
                    <div className='note-bottom-icons-div'>
                        <Reminder />

                        <div className='note-icon-div' role='Button'>
                            <img src={require('../assets/icons/search.svg')} alt="" />
                        </div>
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
            </div>
        );
    }
}
