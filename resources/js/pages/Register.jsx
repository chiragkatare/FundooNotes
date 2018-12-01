import React, { Component } from 'react';
import Input from '../components/Input';
import {Card ,Typography ,Button ,CardContent} from '@material-ui/core/';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      rpassword: '',
    }
    this.getDataFromInput = this.getDataFromInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  getDataFromInput(data) {
    //console.log( this.state);

    this.setState({
      [event.target.name]: data
    })
  }

  handleClick(){
    axios({
      method: 'post',
    });
    
  }

  render() {
    return (
      <div>
        <Card id='formcard'>
          <CardContent>
            <div >
              <Typography variant="h5" component="h2" className='login' color='primary' id = 'card-heading' >
                Register
        </Typography>
              <div className='form'>
                <div>
                  <Input name={'firstname'} type={'text'} placeholder={'Enter First Name'} label={'First name'} onChange={this.getDataFromInput} />
                  <Input name={'lastname'} type={'text'} placeholder={'Enter Last Name'} label={'Last Name'} onChange={this.getDataFromInput} />
                </div>
                <div>
                  <Input name={'email'} type={'Email'} placeholder={'Enter Your Email'} label={'Email'} onChange={this.getDataFromInput} required={true} />
                </div>
                <div>
                  <Input name={'password'} type={'password'} placeholder={'Enter Password'} label={'PassWord'} onChange={this.getDataFromInput} />
                </div>
                <div>
                  <Input name={'rpassword'} type={'password'} placeholder={'Confirm PassWord'} label={'Confirm Password'} onChange={this.getDataFromInput} required={true} />
                </div>
                <div id='register-btn-div'>
                  <Button onClick={this.handleClick} className='register-btn' variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </div>
                <span><Typography id='reg-text-login'>Already have an account</Typography></span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Register;