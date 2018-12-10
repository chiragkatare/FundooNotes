//import AppBar from "../components/AppBar";
import { Component } from "react";

class DashBoard extends Component{
    constructor(props) {
        super(props);
        this.state = {
          token: '',
          status: false,
          message: '',
          data:'' 
        }
      }
      render(){
          return(
             // <AppBar/>
             <div></div>
          );
      }
}
