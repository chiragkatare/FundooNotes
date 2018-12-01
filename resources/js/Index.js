import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import Login from './pages/login';
import '../css/app.css'
import Register from './pages/Register';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import defTheme from "./components/themeDefault"

const theme = createMuiTheme(defTheme);

export default class Index extends Component {
    
    render() {
        return (
           <Router>
               <div>
               <MuiThemeProvider theme={theme}>
                   <Route path='/' exact component={Login}></Route>
                   <Route path='/register' component={Register}></Route>
                   </MuiThemeProvider>
               </div>
           </Router>
        );
    }
}

if (document.getElementById('Index')) {
    ReactDOM.render(<Index />, document.getElementById('Index'));
}
