import React, { Component } from 'react';
import Input from '../components/Input';
import {Card ,Typography ,Button ,CardContent} from '@material-ui/core/';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    }
    this.getDataFromInput = this.getDataFromInput.bind(this);
  }
  getDataFromInput(data) {
    console.log("From register", data);

    this.setState({
      first_name: data
    })
  }
  render() {
    return (
      <div>
        <Card id='formcard'>
          <CardContent>
            <div >
              <Typography variant="h5" component="h2" className='login' color='primary' id = 'card-input' >
                Register
        </Typography>
              <div className='form'>
                <div>
                  <Input type={'text'} placeholder={'Enter First Name'} label={'First name'} onClick={this.getDataFromInput} />
                  <Input type={'text'} placeholder={'Enter Last Name'} label={'Last Name'} onClick={this.getDataFromInput} />
                </div>
                <div>
                  <Input type={'Email'} placeholder={'Enter Your Email'} label={'Email'} onClick={this.getDataFromInput} required={'true'} />
                </div>
                <div>
                  <Input type={'password'} placeholder={'Enter Password'} label={'PassWord'} onClick={this.getDataFromInput} />
                </div>
                <div>
                  <Input type={'password'} placeholder={'Confirm PassWord'} label={'Confirm Password'} onClick={this.getDataFromInput} required={'true'} />
                </div>
                <div id='register-btn-div'>
                  <Button className='register-btn' variant="contained" color="primary">
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