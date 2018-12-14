import CAppBar from "../components/CAppBar";
import React from "react";
import SideDrawer from '../components/SideDrawer'
import TakeNote from '../components/TakeNote';
import UserService from '../services/UserService';
import Note from "../components/Note";

var userService = new UserService();


export default class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            Notes: [],
        }
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.logout = this.logout.bind(this);
        this.getNewNote = this.getNewNote.bind(this);
    }

    getNewNote = (note) => {
        // debugger;
        console.log(note);

        var arr = this.state.Notes;
        arr.push(note);;
        this.setState({
            Notes: arr,
        })

    }

    handleMenuClick() {
        if (this.state.drawerOpen === false)
            this.setState({ drawerOpen: true });
        else
            this.setState({ drawerOpen: false });

        console.log(this.state);

    }

    /**
    * function to logout the user from the app
    */
    logout() {
        userService.logout().then(res => {
            alert('logout succesful');
            console.log('res');
            this.props.history.push('/login');

        }).catch();
    }

    render() {
        console.log('dash render', this.state.Notes);

        if ((localStorage.getItem('fundootoken')) === null) {
            this.props.history.push('/login');
        }

        var notes = (  this.state.Notes.map((note ,index) => {
            return <Note key={index} title={note.title} body={note.body}></Note>
        })

        );

        return (
            <div >
                <div><CAppBar menuClick={this.handleMenuClick} logout={this.logout} /></div>
                <div><SideDrawer open={this.state.drawerOpen} /></div>
                <div><TakeNote sendNote={this.getNewNote} /></div>
              
                <div className='notes-div'>{notes}</div>

            </div>
        );
    }
}
