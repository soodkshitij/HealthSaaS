import React, { Component } from 'react';
import * as API from "../api/api";
import NavBar from "./NavBar";
import Footer from "../components/Footer";
import SearchComponent from "./SearchComponent";
import DoctorSearchTemplate from "../components/DoctorSearchTemplate";
import queryString from 'query-string';


class SearchResults extends Component{

    constructor(props){
        super(props)
        this.state = {
            search_results: []
        }
    }

    componentDidMount(){
        console.log(this.props);
        const parsed = queryString.parse(this.props.location.search);
        console.log(parsed);
        API.searchResults(parsed.search_term, parsed.city).then(response =>{
            console.log(response);
            this.setState({...this.state, search_results: response.data});
        });
    }

    renderSearchBlock(){
        return (
            <div>
                <NavBar active={{'landing_class':true}} header_prop={'secondary-nav-block'}/>
                <SearchComponent simple_search={true}/>
                <div class="c-filter__top__wrapper"></div>
                <DoctorSearchTemplate res={this.state.search_results}/>
                <Footer />
            </div>

        );
    }


    render(){
        return (
            this.renderSearchBlock()
        );
    }

}

export default SearchResults;