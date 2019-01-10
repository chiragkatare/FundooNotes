import React from 'react';

import { IconButton, InputBase } from '@material-ui/core/';

export default class LabelComp extends React.Component {

    state = {
        searchFocus: false,
        search:null,
    }

    

     /**
     * 
     */
    handleSearchFocus=(e)=>{
        // this.setState({
        //     searchFocus: !this.state.searchFocus
        // })
        this.props.handleSearchBar(); 
    }

    handleSearchInput=(event)=>{
        this.setState({
            search:event.target.value
        })
    }

    /**
     * 
     */
    handleSearchTerm=(event)=>{
        this.props.handleSearchTerm(event.target.value);
    }

    render() {
        // console.log('labelcomp', this.state);
        return (
            <div className={this.props.searchBarStatus ? 'appbar-search-focus' : 'appbar-search'}>
                <IconButton>
                    <img className='icon' src={require('../assets/icons/search.svg')} alt="" />
                </IconButton>

                <InputBase
                    onFocus={this.handleSearchFocus}
                    onBlur={this.handleSearchFocus}
                    onChange={this.handleSearchTerm}
                    // {this.handleSearchInput}
                    fullWidth
                    placeholder="Search…"
                />
                <IconButton>
                    <img className='icon' src={require('../assets/icons/close.svg')} alt="" />
                </IconButton>

            </div>
        );
    }
}