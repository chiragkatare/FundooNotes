import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import green from '@material-ui/core/colors/green';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import { Fade } from '@material-ui/core';

export default class ColorPallate extends React.Component {
    state = {
        open: false,
        anchorEl: null,
        colors: ['rgb(255, 255, 255)', 'rgb(204, 255, 144)', 'rgb(242, 139, 130)', 'rgb(251, 188, 4)',
            'rgb(255, 244, 117)', 'rgb(167, 255, 235)', 'rgb(203, 240, 248)','rgb(174, 203, 250)',
            'rgb(215, 174, 251)','rgb(253, 207, 232)','rgb(230, 201, 168)','rgb(232, 234, 237)'
        ],
    };

    handleClick = (event) => {
        const { currentTarget } = event;
        this.setState({
            open: !this.state.open,
            anchorEl: currentTarget,
        });
    }

    onColorChange=(color)=>{
        console.log('index',color);
        this.props.setColor(color);
        
    }

    render() {
    
        
        var colors = this.state.colors.map((color, index) => {
            return <Avatar className='colorpallate-avatar'
                key={index}
                style={{ backgroundColor: color }}
                onClick={()=>this.onColorChange(color)}
            ></Avatar>
        });
        return (
            <div onMouseEnter={this.handleClick} onMouseLeave={this.handleClick} 
            // onMouseEnter={this.handleClick} onMouseLeave={this.handleClick}
            >
                <div className='note-icon-div' role='Button' >
                    <img src={require('../assets/icons/ColorPallate.svg')} alt="" />
                </div>
                <Popper className='colorpallate-popper' open={this.state.open} transition disablePortal anchorEl={this.state.anchorEl}
                    placement={'top-start'}
                >
                    {({ TransitionProps, placement }) => (
                        <Fade
                            {...TransitionProps}
                            style={{ transformOrigin: 'center bottom' }}
                        >
                            <Paper  >
                                <Grid container justify="center" alignItems="center" className={'colorpallate-paper'}
                                >
                                    {colors}
                                </Grid>
                            </Paper>
                        </Fade>
                    )}
                </Popper>

            </div>
        );
    }

}