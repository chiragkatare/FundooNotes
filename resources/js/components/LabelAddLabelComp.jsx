import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';




export default class AddLabel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
         added:false,
        };
    }

    componentDidMount(){
        // debugger;
        // console.log('labellllll mount');
        
        for (let i = 0; i < this.props.note.labels.length; i++) {
            const element = this.props.note.labels[i];
            if(element.labelname.id===this.props.label.id){
                this.setState({
                    added:true,
                })
                break;
            }
        }
  }

//   componentWillUpdate

  handleAddLableClick=()=>{
      this.setState({
          added:!this.state.added,
      },
      ()=>{
        //   debugger;
          if(this.state.added===true){
            this.props.handleNoteLabel(this.props.noteIndex,this.props.note.id,this.props.label.id);
          }
          else{
            //   debugger;
            this.props.handleDeleteNoteLabel(this.props.noteIndex,this.props.note.id,this.props.label.id);
          }
      });  
  }

    render(){
        // console.log('lablcomp',this.state);
        return(
            <div className='add-label-div' onClick={this.handleAddLableClick} >
                <Checkbox disableRipple defaultChecked
                    color="default"
                    checked={this.state.added}
                    icon={<img className='icon' src={require('../assets/icons/Unchecked.svg')} alt="" />}
                    checkedIcon={<img className='icon' src={require('../assets/icons/Checked.svg')} alt="" />}
                />{this.props.label.label}</div>
        );
    }
}