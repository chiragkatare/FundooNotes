import CAppBar from "../components/CAppBar";
import React from "react";

export default class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            status: false,
            message: '',
            data: ''
        }
    }
    render() {
        return (
            <div style={{background: 'red'}}> 
                <div><CAppBar /></div>
            </div>
        );
    }
}
