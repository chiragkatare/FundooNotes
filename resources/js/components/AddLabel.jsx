
import React from 'react';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/';
import { Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import LabelAddLabelComp from './LabelAddLabelComp';


const theme = createMuiTheme({
    overrides: {
        MuiIconButton: {
            root: {
                padding: 1,
            }
        },
    }, typography: {
        useNextVariants: true,
    },
    // .MuiIconButton-root-546
});

export default class AddLabel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            custom: false,
            addLabel: false,
        };
    }



    render() {
        var labels = this.props.user.labels.map((label, index) => {
            return <LabelAddLabelComp
                key={index}
                label={label}
                note={this.props.note}
            />
        });
        console.log('addlabelnote', labels);

        return (
            <div >
                <MuiThemeProvider theme={theme}>
                    <Popper className='reminder-popper' style={{ position: 'fixed' }} open={this.props.open} transition disablePortal
                        anchorEl={this.props.anchorEl}
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <MenuList>
                                        {this.props.note.deleted === '0' ?
                                            <div className='add-label-div'>
                                                <Typography
                                                    align='center'
                                                > Add Label</Typography>
                                            </div> : ''}
                                        {labels}
                                    </MenuList>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </MuiThemeProvider>
            </div>
        );
    }
}