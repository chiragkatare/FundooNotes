import React, { Component } from "react";
import Input from "../components/Input"
import { Card, Typography, Button, CardContent } from '@material-ui/core/';
import UserService from "../services/UserService";
import { Redirect } from "react-router-dom"

var userService = new UserService();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isValid: '',
      error: '',
      isLoggedIn: false,
    }
    this.getDataFromInput = this.getDataFromInput.bind(this);
    this.validate = this.validate.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  /**
   * function to handle the input validations of the page
   * 
   * @param {event} event 
   */
  validate(event) {
    var error = {
      email: '',
      password: '',
    };
    var isvalid = true;
    // if(event.target.name==='firstname'){

    if (this.state.email.length < 1) {
      error.email = 'Email is required'
      isvalid = false;
    }
    //}
    //else if(event.target.name==='password'){
    if (this.state.password.length < 1) {
      error.password = 'Password cannot be empty'
      isvalid = false;
    }
    this.setState({
      error: error,
    })
    return isvalid;
  }

  /**
   * function to get data from the object
   * 
   * @param {var} data 
   */
  getDataFromInput(data) {
    this.setState({
      [event.target.name]: data
    })
  }

  /***
   * function to handle click of the button of login
   * 
   * @param {event} event 
   */
  handleClick() {
    if (this.validate()) {
      let data = {
        email: this.state.email,
        password: this.state.password,
      }
      userService.login(data).then(response => {
        console.log("asasa", response);
        console.log(this.state);

        if (response.status === 200) {
          this.setState({
            isLoggedIn: true,
          });
        }
        else if (response.status === 204) {
          this.setState({
            error: {
              email: 'invalid credentials',
            }
          })
        }
        else if (response.status === 211) {
          localStorage.removeItem('fundootoken');
          this.props.history.push('/notverified');
        }


      }
      ).catch(error => {
        //console.log("401",error);

      });
    }
  }

  /**
   * render function to render on html page
   */
  render() {

    /**
     * redirect user if already logged in
     */
    if ((localStorage.getItem('fundootoken')) !== null || this.state.isLoggedIn == true) {
      return (<Redirect to='/dashboard'></Redirect>);
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
                  <Input name='email' type={'Email'} placeholder={'Enter Your Email'} label={'Email'} onChange={this.getDataFromInput} />
                  <div className='error'>{this.state.error.email}</div>
                </div>
                <div>
                  <Input name='password' type={'Password'} placeholder={'Enter PassWord'} label={'PassWord'} onChange={this.getDataFromInput} />
                  <div className='error'>{this.state.error.password}</div>
                </div>
                <div id='login-btn-div'>
                  <Button variant="contained" color="primary" type='submit' onClick={this.handleClick} className='login-btn'>
                    Login
                </Button>
                </div>
              </div>
              <div >
                <span className='below-txt' >
                  <span><a href="/forgetpassword">Forgot Password</a></span>
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