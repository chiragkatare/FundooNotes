import React, { Component } from "react";
import { Card, Typography, Button, CardContent } from '@material-ui/core/';
import axios from "axios";


export default class EmailVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status:false,
      message:'hello',
    }
  }

  componentDidMount(){
      let eemail = (window.location.pathname).substring(13);
      //var data = {email:eemail}
      console.log(eemail);
      
      axios.post('/api/verifyemail',{email:eemail})
      .then((response)=>{
        this.setState(
            {
                message:response.data.message,
            });
      }
      ).catch((error)=>{
          // /console.log('rereerrors',error);
      });
  }

  render() {

    return (

      <div>
        <Card id='logincard'>
          <CardContent>
          <Typography >{this.state.message}</Typography>
          </CardContent>
        </Card>
      </div>

    );
  }
}