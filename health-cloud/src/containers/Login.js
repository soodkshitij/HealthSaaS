import React, { Component } from 'react';
import NavBar from "./NavBar";
import { Link, Redirect } from 'react-router-dom'
import Footer from "../components/Footer";
import Illustration from '../assets/illustration.png';
import * as API from '../api/api';
import { connect } from 'react-redux';
import * as actionTypes from '../store/action';


class Login extends Component{

    constructor(props){
        super(props);
        this.state ={
            otp_login : false,
            redirect_home: false
        }

    }

    handleLogin = (event) =>{
        event.preventDefault();
        console.log("Inside login handle");
        const form_data = new FormData(this.form);
        const data = {};
        for (let val of form_data.keys()){
            data[val] = form_data.get(val);
        }
        console.log(data);
        data['otp_login'] = this.state.otp_login;

        API.login(data).then(response =>{

            if (response.data.result){
                localStorage.setItem('token',response.data.token);
                this.props.onLoginSuccess(response.data.user_obj);
                if (response.data.otp_login){
                    this.setState({...this.state, otp_login:true});
                }
                else{
                    this.setState({...this.state, redirect_home:true})
                }


            }

        });

    }

    togglePassword = (event) =>{
        console.log("toggle password");
        if(this.otp_node.checked) {
            console.log(this.password_node.disabled);
            this.password_node.disabled = true;
            this.state.otp_login = true;
        }
        else{
            this.password_node.disabled = false;
            this.state.otp_login = false;
        }
    }

    render(){
        console.log("inside render");
        if (this.state.otp_login){
            console.log("redirecting....");
            return <Redirect
                to={{
                    pathname: "/verify-otp",
                    search: `?mobile=${this.username_node.value}`,
                    state: { otp_login: true }
                }}
            />
            // return <Redirect to={`/verify-otp/?mobile=${this.username_node.value}`} />
        }

        if (this.state.redirect_home){
            console.log("redirecting home....");
            return <Redirect
                to={{
                    pathname: "/"
                }}
            />
        }


        return (
            <form ref={(ref)=>this.form=ref}>
                <div>
                    <NavBar active={{'landing_class':true}} header_prop={'secondary-nav-block'}/>
                    <div className={'container'} style={{'marginTop':'20px','marginBottom':'20px'}}>
                        <div className={'row'}>
                            <div className={'col-md-12'}>
                                <div className={'col-md-9 login_register_header'}>
                                    <span className={'login_register_header_span_left active'}><a href={"javascript:void(0)"} className={'blue'}>Login</a></span>
                                    <span className={'login_register_header_span_right'}><Link className={'black'} to={"/register"}>Register</Link></span>
                                </div>
                            </div>
                        </div>
                        <div className={'row'} style={{'marginTop':'8%','marginBottom':'5%'}}>
                            <div className={'col-md-12 custom_div'}>
                                <div className={'col-md-5 col-md-offset-1'}>
                                    <img width={'394px'} src={Illustration}/>
                                </div>
                                <div className={'col-md-4 col-md-offset-1 outer_login_form'}>
                                    <div className={'login_form'}>
                                        <div>
                                            <div className="padding-bottom-15">
                                                Mobile Number / Email ID
                                            </div>
                                            <input className={"form-control email-text"} ref={(node) => this.username_node = node} name={'username'} placeholder={'Mobile Number / Email ID'}></input>
                                            <span id="usernameErrorBlock" className="errorText textMuted error-block display-block"></span>
                                        </div>
                                        <div id="passwordContainer">
                                            <div className={"padding-bottom-15 padding-top-20"}>Password</div>
                                            <input ref={(node) => this.password_node = node} className={"form-control email-text"} type={'password'} name={'password'} placeholder={'Password'}></input>
                                        </div>
                                        <div className="padding-top-20 font-12 textMuted">
                                            <div className={"otp-flow"} onClick={this.togglePassword}>
                                                <div className="otp_flow">
                                                    <input ref={(node) => this.otp_node = node} id="otp_flow" name="otp_flow" type="checkbox" value="y"></input>
                                                        <label htmlFor="otp_flow"></label>
                                                </div>
                                                <label className={"mousePointer font-14 textMuted line-height-20"}
                                                       htmlFor="otp_flow">Login with OTP instead of password</label>
                                            </div>
                                        </div>
                                        <div id="google_login_widget" style={{'paddingTop':'50px'}}>
                                            <div className="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
                                        </div>
                                        <div className="padding-top-20" style={{"marginTop": "20px"}}>
                                            <button onClick={this.handleLogin} type="submit" className="btn  btn-lg common-btn practo-btn" id={"login"}>
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </form>

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
        onLogout: (user_obj) => dispatch({type: actionTypes.AUTH_ACTIVITY, user: {}, logged_in: false})
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);