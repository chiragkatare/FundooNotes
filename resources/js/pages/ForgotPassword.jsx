import React, { Component } from "react";
import Input from "../components/Input"
import { Card, Typography, Button, CardContent } from '@material-ui/core/';
import UserService from "../services/UserService";
import {Redirect} from "react-router-dom"

var userService= new UserService();

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    }
    this.getDataFromInput = this.getDataFromInput.bind(this);

  }

  getDataFromInput(data) {
    this.setState({
      [event.target.name]: data
    });
    // console.log();
    
  }

  handleClick(event) {
    userService.forgotPass(this.state).then(res=>{
      if(res.status==200){
        
      }
    }).catch();
  }

  render() {
    if(localStorage.getItem('fundootoken')!==null){
       this.props.history.push("/");
    }

    return (

      <div>
        <Card id='logincard'>
          <CardContent>
            <div>
              <Typography variant="h5" component="h2" color='primary' id='login-text'>
                Forget Password
        </Typography>
              <div>
                <Input name='email' type={'Email'} placeholder={'Enter Your Email'} label={'Email'} onChange={this.getDataFromInput}  />
              </div>
              <div id = 'login-btn-div'>
                <Button variant="contained" color="primary" type='submit' onClick={this.handleClick.bind(this)} className='login-btn'>
                  Submit
                </Button>
              </div>
              <span id ='right-text'><a href="/register">Sign Up</a></span>
              <span id='left-text' ><a href="/">Login</a></span>
            </div>
          </CardContent>
        </Card>
      </div>

    );
  }
}