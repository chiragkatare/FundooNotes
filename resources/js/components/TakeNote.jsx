import React from 'react';
import { Card, InputBase, IconButton, Typography, Button, CardContent, createMuiTheme, MuiThemeProvider } from '@material-ui/core/';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {DateFormatInput, TimeFormatInput} from 'material-ui-next-pickers'

const theme = createMuiTheme({
    overrides: {
        MuiIconButton: {
            root: {
                padding: 7,
            }
        }
    }, typography: {
        useNextVariants: true,
    },
    // .MuiIconButton-root-41
});


export default class TakeNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            title: '',
            body: '',
            reminder: '',
        };
        this.handleTakeNote = this.handleTakeNote.bind(this);
    }

    handleNewNote = () => {
        // debugger;
        var Note = {
            title: this.state.title,
            body: this.state.body,
            reminder: ''
        }
        if (Note.title !== '' || Note.body !== '') {
            this.props.sendNote(Note);
            this.setState({
                title: '',
                body: '',
                reminder: '',
            });
        }
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });

    }

    handleTakeNote = () => {
        this.setState({
            active: !this.state.active,
        });
        this.handleNewNote();
    }

    render() {
        console.log('takenote', this.state);

        var Open = (<Card className='takenote-div-open' >
            <InputBase name='title' fullWidth placeholder='Title' onChange={this.handleInput} />
            <InputBase name='body' multiline fullWidth placeholder='Take a note..' onChange={this.handleInput} />

            <IconButton className='icon'>
                <img src={require('../assets/icons/RemindMe.svg')} alt="" />
            </IconButton>
            <Popper className='appbar-menu-profile' open={true} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <MenuList>
                                <MenuItem >Profile</MenuItem>
                                <MenuItem >My account</MenuItem>
                            </MenuList>
                        </Paper>
                    </Grow>
                )}
            </Popper>
            <IconButton className='icon'>
                <img src={require('../assets/icons/search.svg')} alt="" />
            </IconButton>
            <IconButton className='icon'>
                <img src={require('../assets/icons/Collaborator.svg')} alt="" />
            </IconButton>
            <IconButton className='icon'>
                <img src={require('../assets/icons/ColorPallate.svg')} alt="" />
            </IconButton>
            <IconButton className='icon'>
                <img src={require('../assets/icons/AddImage.svg')} alt="" />
            </IconButton>
            <IconButton className='icon'>
                <img src={require('../assets/icons/Archive.svg')} alt="" />
            </IconButton>
            {/* <IconButton className='icon'>
                    <img src={require('../assets/icons/More.svg')} alt="" />
                </IconButton>
             */}
            <Button className='card-button-close' component="span" onClick={this.handleTakeNote}>
                Close
        </Button>


        </Card>
        );

        var Close = (<div className='takenote-div' onClick={this.handleTakeNote} >
            <InputBase fullWidth placeholder='Take a note..' />
        </div>);

        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    {this.state.active ? (Open) : (Close)}
                </div>
            </MuiThemeProvider>
        );
    }


}