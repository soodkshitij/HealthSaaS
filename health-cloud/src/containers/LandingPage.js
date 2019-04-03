import React, { Component } from 'react';
import NavBar from "./NavBar";
import SearchComponent from './SearchComponent';
import AvailableTests from "./AvailableTests";
import Footer from "../components/Footer";


class LandingPage extends Component{


    render(){
        return (
            <div>
                <NavBar active={{'landing_class':true}} header_prop={'secondary-nav-block'}/>
                <SearchComponent simple_search={false}/>
                <AvailableTests limit={3} offset={0}/>
                <Footer/>
            </div>

        );
    }

}

export default LandingPage;