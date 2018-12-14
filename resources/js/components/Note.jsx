import React from "react";
import { Card } from '@material-ui/core';
import { Button, IconButton, Typography, InputBase, CardActions ,CardContent} from '@material-ui/core/';


export default class Note extends React.Component {

    constructor(props) {
       super(props);
        this.state = {
            title:'',
            body:'',
            reminder:'',
            reminderstatus:true,
        };
    }

    /**
     * LIFECYCLE METHOD
     * Called Automatically
     * runs before mounting of the component
     */
    componentWillMount(){
        this.setState({
            title:this.props.title,
            body:this.props.body,
        })
    }

    render() {
        return (
            <div className='note-card'>
            <Card >
                <CardContent>
                    {/* <Typography color="textSecondary" gutterBottom>
                        Word of the Day
            </Typography> */}
                    <Typography variant='h6' component="p">
                        {this.state.title}
            </Typography>
                    {/* <Typography color="textSecondary">
                        adjective
            </Typography> */}
                    <Typography  component="p">
                        {this.state.body}
                    </Typography>
                </CardContent>
                <div className='note-bottom-icons-div'>
                <div className='note-icon-div' role='Button'>
                    <img src={require('../assets/icons/RemindMe.svg')} alt="" />
                </div>

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
