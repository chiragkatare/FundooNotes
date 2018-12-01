import React, { Component } from "react";
import Input from "../components/Input"
import { Card, Typography, Button, CardContent } from '@material-ui/core/';



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.getDataFromInput = this.getDataFromInput.bind(this);
  }
  getDataFromInput(data) {
    console.log("From register", data);

    this.setState({
      email: data
    })
  }

  handleClick(event) {
    console.log(event);
    alert("login");
  }

  render() {
    return (

      <div>
        <Card id='logincard'>
          <CardContent>
            <div>
              <Typography variant="h5" component="h2" color='primary' id='login-text'>
                Login
        </Typography>
              <div>
                <Input type={'Email'} placeholder={'Enter Your Email'} label={'Email'} onClick={this.getDataFromInput} color />
              </div>
              <div>
                <Input type={'Password'} placeholder={'Enter PassWord'} label={'PassWord'} onClick={this.getDataFromInput} />
              </div>
              <div id = 'login-btn-div'>
                <Button variant="contained" color="primary" type='submit' className='login-btn'>
                  Login
                </Button>
              </div>
            </div>
          </CardContent>

        </Card>
      </div>

    );
  }

}

export default Login;