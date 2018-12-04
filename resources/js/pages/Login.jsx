import React, { Component } from "react";
import Input from "../components/Input"
import { Card, Typography, Button, CardContent } from '@material-ui/core/';
import UserService from "../services/UserService";
import {Redirect} from "react-router-dom"

var userService= new UserService();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoggedIn:false,
    }
    this.getDataFromInput = this.getDataFromInput.bind(this);

  }

  getDataFromInput(data) {

    this.setState({
      [event.target.name]: data
    })
  }

  handleClick(event) {
    // console.log(event);
    // console.log(this.state);
    userService.login(this.state).then(this.setState({
      isLoggedIn:true,
    })).catch();
  }

  /**
   * render function to render on html page
   */
  render() {
   
    if((localStorage.getItem('fundootoken'))!== null||this.state.isLoggedIn==true){
      return(<Redirect to='/details'></Redirect>);
    }

    return (

      <div>
        <Card id='logincard'>
          <CardContent>
            <div>
              <Typography variant="h5" component="h2" color='primary' id='login-text'>
                Login
        </Typography>
              <div>
                <Input name='email' type={'Email'} placeholder={'Enter Your Email'} label={'Email'} onChange={this.getDataFromInput}  />
              </div>
              <div>
                <Input name='password' type={'Password'} placeholder={'Enter PassWord'} label={'PassWord'} onChange={this.getDataFromInput} />
              </div>
              <div id = 'login-btn-div'>
                <Button variant="contained" color="primary" type='submit' onClick={this.handleClick.bind(this)} className='login-btn'>
                  Login
                </Button>
              </div>
            </div>
            <div >
              <span className='below-txt' > 
            <Typography >Fogot Password?</Typography>
            </span>
            <span >
            <Typography >New User,<a href="/register">SignUp</a></Typography>
            </span>
            </div>
          </CardContent>
        </Card>
      </div>

    );
  }

}

export default Login;