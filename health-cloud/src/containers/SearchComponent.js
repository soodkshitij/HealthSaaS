import React, { Component } from 'react';
import SuggestionDropDown from "../components/SuggestionDropdown";
import * as API from "../api/api";
import SuggestionDropDownCity from "../components/SuggestionDropDownCity";

class SearchComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            top_suggestion:[],
            show_dropdown:false,
            city_dropdown:false,
            search_text:'',
            city:''
        }
    }

    handleCityBoxClick = (e) => {
        console.log("clicked handleCityBoxClick");
        setTimeout(function () {
            console.log(this.state);
            if (this.state.city.length==0) {
                this.setState({...this.state, city_dropdown: true})
            }
        }.bind(this),500);

    }

    handleSearchBoxClick = (e) => {
        console.log("clicked");
        this.setState({...this.state, show_dropdown:true});
    }

    handleChange =(e) =>{
        console.log(e.target.value);
        if (e.target.value.length ===0 ){
            this.setState({...this.state, top_suggestion:[],search_text:'',show_dropdown:false});
        }
        else{
            let term = e.target.value;
            API.getAutoComplete(term,this.state.city).then(response =>{
                console.log(response);
                this.setState({...this.state,top_suggestion:response.data,search_text:term,show_dropdown:true});
            })
        }
    }

    selectCityHandler = (city) =>{
        console.log("Inside selectCityHandler ",city);
        this.setState({...this.state, city: city,city_dropdown:false})
    }

    renderSearchBlock(){

        let search_block = "search-block";
        let c_h = "";
        if (this.props.simple_search ==true){
            search_block = "search-block-simple";
            c_h = "hidden";
        }

        return (
            <div className={'row'}>
                <div className={'col-md-12 search-container'}>
                    <div className={search_block}>
                        <h1 className={`search-block-header ${c_h}`}>Your home for health</h1>
                        <div className={`search-block-header search-block-subheading ${c_h}`}>Find and Book</div>
                        <div className={'row suggestions-block'}>
                            <div onClick={this.handleCityBoxClick} className={'col-md-2 col-md-offset-3 location-dropdown'}>
                                <span className={'c-omni-searchbox__icon'}><i className="fa fa-map-marker" aria-hidden="true"></i></span>
                                <input value={this.state.city} ref={(node) => this.s_input_city = node} className={'c-omni-searchbox c-omni-searchbox--large'}  placeholder={'Search locations.'}/>
                                { this.state.city_dropdown?
                                <SuggestionDropDownCity handler={this.selectCityHandler}/>:
                                    null}
                            </div>
                            <div className={'col-md-4 doctors-dropdown'}>
                                <div onClick={this.handleSearchBoxClick} className={'search-autocomplete-block'}>
                                    <span className={'c-omni-searchbox__icon'}><i className="fa fa-search" aria-hidden="true"></i></span>
                                    <input onChange={this.handleChange} ref={(node) => this.s_input = node} className={'c-omni-searchbox c-omni-searchbox--large'}  placeholder={'Search doctors, clinics, hospitals, etc.'}/>
                                </div>
                                { this.state.show_dropdown?
                                    <SuggestionDropDown city={this.state.city} sugg={this.state.top_suggestion} search_term={this.state.search_text} />:
                                    null}
                            </div>
                        </div>
                    </div>
                    { this.props.simple_search == false ?
                    <div className={'c-icon-list'}>
                       <div className={'row c-icon-list-wrapper'}>
                           <div className={'col-sm-4 icon-tabbed c-icon-a'}>
                                <a href={'/consult'}>
                                    <i className="fa fa-commenting-o tab-icon c-icon" aria-hidden="true"></i>
                                    <span className={'tab-icon-text'}>Chat with doctor</span>
                                </a>
                           </div>
                           <div className={'col-sm-4 icon-tabbed c-icon-a'}>
                               <a href={'/drive/records'}>
                                   <i className="fa fa-file-text tab-icon c-icon" aria-hidden="true"></i>
                                   <span className={'tab-icon-text'}>View medical records</span>
                               </a>
                           </div>
                           <div className={'col-sm-4 icon-tabbed c-icon-a'}>
                               <a href={'/health-checkup'}>
                                   <i className="fa fa-flask tab-icon c-icon" aria-hidden="true"></i>
                                   <span className={'tab-icon-text'}>Book test</span>
                               </a>
                           </div>
                        </div>
                    </div>:
                        null}
                </div>
            </div>
        );
    }


    render(){
        return (
            this.renderSearchBlock()
        );
    }

}

export default SearchComponent;