import React from 'react';
import { Card,InputBase, Typography, Button, CardContent } from '@material-ui/core/';


export default class TakeNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <Card className='takenote-card'>
                <CardContent>
                <InputBase placeholder='Take a Note'/> 
                </CardContent>
            </Card>
        );
    }


}