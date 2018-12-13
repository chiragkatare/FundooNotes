import CAppBar from "../components/CAppBar";
import React from "react";
import SideDrawer from '../components/SideDrawer'
import TakeNote from '../components/TakeNote';

export default class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen:false,
        }
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick() {
        if (this.state.drawerOpen === false)
            this.setState({ drawerOpen: true });
        else
            this.setState({ drawerOpen: false });

            console.log(this.state);
            
    }

    render() {
        return (
            <div > 
                <div><CAppBar menuClick={this.handleMenuClick} /></div>
                <div><SideDrawer open={this.state.drawerOpen}/></div>
                <div><TakeNote/></div>
                
            </div>
        );
    }
}
