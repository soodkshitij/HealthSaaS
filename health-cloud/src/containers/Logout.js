import React, { Component } from 'react';
import NavBar from "./NavBar";
import { Link, Redirect } from 'react-router-dom'
import Footer from "../components/Footer";
import Illustration from '../assets/illustration.png';
import * as API from '../api/api';
import { connect } from 'react-redux';
import * as actionTypes from '../store/action';


class Logout extends Component{

    constructor(props){
        super(props);
        this.props.onLogout();

    }


    render(){
        console.log("inside render logout");
            console.log("redirecting....");
            return <Redirect
                to={{
                    pathname: "/login",
                }}
            />
            // return <Redirect to={`/verify-otp/?mobile=${this.username_node.value}`} />

        return (
           <>
               Logout
               </>

        );
    }

}

const mapStateToProps = state => {
    return {
        logged_id: state.logged_id,
        user_obj : state.user
    };
};

const mapDispatchToProps = dispatch => {
    console.log("Inside mapDispatchToProps")
    return {
        onLoginSuccess: (user_obj) => dispatch({type: actionTypes.AUTH_ACTIVITY, user: user_obj, logged_in: true}),
        onLogout: () => dispatch({type: actionTypes.UNAUTH_ACTIVITY, user: {}, logged_in: false})
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Logout);