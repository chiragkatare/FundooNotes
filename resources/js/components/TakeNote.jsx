import React from 'react';
import { Card, InputBase, IconButton, Typography, Button, CardContent,createMuiTheme, MuiThemeProvider } from '@material-ui/core/';

const theme = createMuiTheme({
    overrides: {
        MuiIconButton: {
            root: {
               padding:7,
            }
        }
    }, typography: {
        useNextVariants: true,
    },
    // .MuiIconButton-root-41
})

export default class TakeNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };
        this.handleTakeNote = this.handleTakeNote.bind(this);
    }

    handleTakeNote = () => {
        this.setState({
            active: !this.state.active,
        });
        console.log(this.state);
    }

    render() {

        var Open = (<Card className='takenote-div-open' >
            <InputBase fullWidth placeholder='Title' />
            <InputBase multiline fullWidth placeholder='Take a note..' />
            
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