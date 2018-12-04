import React, { Component } from 'react';
import { Card, Typography, Button, CardContent } from '@material-ui/core/';
import UserService from '../services/UserService';
import {Redirect} from 'react-router-dom';
import red from '@material-ui/core/colors/red'

var userService = new UserService();
export default class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hello:'hello',
           userDetails:'',
        }
      this.logout = this.logout.bind(this);
    }

    logout(){
        userService.logout().then(res=>{
            alert('logout succesful');
            console.log('res');
            this.props.history.push('/');
            
        }).catch();
    }

    componentDidMount(){
       userService.getUserData().then(res=>{
            this.setState({
                userDetails:res.data,
            });
            console.log(this.state);
        }).catch();
    }

    render(){
        if((localStorage.getItem('fundootoken'))=== null){ 
            return(<Redirect to='/'></Redirect>);
          }
        return(
            <div>
            <Card id='formcard'>
          <CardContent>
              <Button color='primary' >get</Button>
              <div><Typography>Id : {this.state.userDetails.id}</Typography></div>

              <div><Button variant='contained' color='primary' onClick={this.logout}>Logout</Button></div>
          </CardContent>
        </Card>
            </div>
        );
    }
}