import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import Login from './pages/Login';
import '../css/app.css'
import Register from './pages/Register';
import UserDetails from "./pages/UserDetails";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import defTheme from "./components/themeDefault"
import  ForgotPassword  from "./pages/ForgotPassword";
import EmailVerification from  "./pages/EmailVerification";
import PasswordReset from "./pages/PasswordReset";
import DashBoard from "./pages/DashBoard";

const theme = createMuiTheme(defTheme);

export default class Index extends Component {
    
    render() {
        return (
           <Router>
               <div>
               <MuiThemeProvider theme={theme}>
                   <Route path='/' exact component={Login}></Route>
                   <Route path='/register' component={Register}></Route>
                   <Route path='/details' component={UserDetails}></Route>
                   <Route path='/forgetpassword' component={ForgotPassword}></Route>
                   <Route path='/verifyemail/:email' component={EmailVerification}></Route>
                   <Route path='/passwordreset/:token' component={PasswordReset}></Route>
                   <Route path='/dashboard' component={DashBoard}></Route>
                   </MuiThemeProvider>
               </div>
           </Router>
        );
    }
}

if (document.getElementById('Index')) {
    ReactDOM.render(<Index />, document.getElementById('Index'));
}
