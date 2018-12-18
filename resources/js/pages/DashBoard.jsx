import CAppBar from "../components/CAppBar";
import React from "react";
import SideDrawer from '../components/SideDrawer'
import TakeNote from '../components/TakeNote';
import UserService from '../services/UserService';
import Note from "../components/Note";
import NotesService from "../services/NotesService";
import moment from 'moment';
// import NotesGrid from "../components/NotesGrid";
// import SmallAppBar from '../components/SmallAppBar';

var userService = new UserService();
var noteService = new NotesService();


export default class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            Notes: [],
            gridView: false,
            smallScreen:false,
        }
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.logout = this.logout.bind(this);
        this.getNewNote = this.getNewNote.bind(this);
    }

    componentDidMount() {
        noteService.getNotes().then(
            resp => {
                console.log(resp);

                if (resp.status === 200) {
                    this.setState({
                        Notes: resp.data.message,
                    });
                }
            }
        ).catch();
        setInterval(this.remind,1000);
        this.changeRender();
        window.addEventListener("resize", this.changeRender);
    }

    remind=()=>{
        console.log('hehe');
        this.state.Notes.forEach(note => {
            if(note.reminder=== moment().format('DD MMM YYYY , h:mm a')){
                alert(note.reminder);
            }
        });
    }
    
      componentWillUnmount() {
        window.removeEventListener("resize", this.changeRender);
      }

      changeRender=()=>{
          this.setState({
              smallScreen:window.innerWidth < 830,
          })
          if(this.state.smallScreen===true){
              this.setState({
                  gridView:true,
              });
          }
        //   else{
        //     this.setState({
        //         gridView:false,
        //     });
        //   }
          
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



    }

    /**
    * function to logout the user from the app
    */
    logout() {
        userService.logout().then(res => {
            alert('logout succesful');

            this.props.history.push('/login');

        }).catch();
    }

    changeView = () => {
        this.setState({
            gridView: !this.state.gridView,
        });
    }

    render() {
        console.log(this.state);

        if ((localStorage.getItem('fundootoken')) === null) {
            this.props.history.push('/login');
        }

        var notes = (this.state.Notes.map((note) => {
           
                return <Note gridView={this.state.gridView} key={note.id} title={note.title} body={note.body} reminder={note.reminder} ></Note>
            
        })

        );

        return (
            <div >
                <div><CAppBar gridView={this.state.gridView} menuClick={this.handleMenuClick} changeView={this.changeView} logout={this.logout} /></div>
                <div><SideDrawer open={this.state.drawerOpen} /></div>
                <div><TakeNote sendNote={this.getNewNote} /></div>
                {/* this.state.gridView===true? */}
                <div className={this.state.gridView===true?'notes-div-grid':'notes-div'} >{notes}</div>

            </div>
        );
    }
}
