import React from 'react';

import { InputBase, } from '@material-ui/core/';

export default class LabelComp extends React.Component{

    state = {
        labelHover:false,
        label:this.props.label.label,
    }

    handleHoverLabel=()=>{
        this.setState({
            labelHover:!this.state.labelHover,
        });
    }

    handleLabelChange=(e)=>{
        this.setState({
            label:e.target.value,
        });
    }

    handleEditLabel=()=>{
        // debugger;
        if(this.state.label===this.props.label.label){
            return ;
        }
        debugger;
        let data={
            label:this.state.label,
            labelid:this.props.label.id
        }
        this.props.handleEditLabel(data,this.props.index);
    }

    render(){
        // console.log('labelcomp',this.state);
        
        return(<div  className='edit-labels-diag-content' onMouseEnter={this.handleHoverLabel} onMouseLeave={this.handleHoverLabel}  >
        <img className='icon' 
        src={this.state.labelHover?require('../assets/icons/Delete.svg'):require('../assets/icons/LabelSolid.svg')} 
        alt="" 
        onClick={()=>this.props.handleDeleteLabel(this.props.label,this.props.index)}/>
        <InputBase
            className='edit-labels-input'
            fullWidth
            onChange={this.handleLabelChange}
            defaultValue={this.props.label.label}
        />
        <img className='icon' src={require('../assets/icons/LabelEdit.svg')} alt="" onClick={this.handleEditLabel} />
    </div>);
    }
}