import React, { Component } from 'react';
import NavBar from "./NavBar";
import Footer from "../components/Footer";
import Illustration from '../assets/illustration.png';
import * as API from '../api/api';
import {Redirect} from "react-router-dom";
import * as actionTypes from "../store/action";
import { connect } from 'react-redux';



class VerifyOTP extends Component{



    constructor(props){
        console.log("Inside verify otp constructor")
        console.log(props.location.state);
        super(props);
        this.state = {
            mobile : '',
            existing_user : false,
            redirect : false
        }
        console.log(this.state);
        const query = new URLSearchParams(props.location.search);
        console.log(query.get('mobile'));
        this.state = {'mobile':query.get('mobile')};
        if (props.location.state !== undefined) {
            this.state.existing_user = true;
        }

    }

    postDataHandler = (event) => {
        event.preventDefault();
        const form_data = new FormData(this.form);
        const data = {};
        for (let val of form_data.keys()){
            data[val] = form_data.get(val);
        }
        console.log(this.state);
        data['existing_user'] = this.state.existing_user;
        data['mobile_number'] = this.state.mobile;
        console.log(data);

        API.verifyOtp(data).then(response =>{
            console.log("Response inside verify otp ");
            console.log(response);
            if (response.data.result){
                localStorage.setItem('token',response.data.token);
                this.props.onLoginSuccess(response.data.user_obj);
                this.setState({...this.state, redirect : true});
            }
            else{
                alert(response.data.message);
            }
        })
    }

    generateOtp = () =>{
        console.log("Generate OTP for "+this.state.mobile);
    }

    otpcall = () =>{
        console.log("OTP via call for "+this.state.mobile);
    }


    render(){

        if (this.state.redirect){
            console.log("state");
            console.log(this.state);
            return <Redirect to={'/'} />
        }

        return (
            <div>
                <NavBar active={{'landing_class':true}} header_prop={'secondary-nav-block'}/>
                <div className={'container'} style={{'marginTop':'20px','marginBottom':'20px','minHeight':'590px'}}>
                    <div className={'row'}>
                        <div className={'col-md-12'}>
                            <div className={'col-md-9 login_register_header'}>
                                <span className={'login_register_header_span_left'}><a href={'/login'} className={'black'}>Login</a></span>
                                <span className={'login_register_header_span_right'}><a href={'/register'} className={'black'}>Register</a></span>
                            </div>
                        </div>
                    </div>
                    <div className={'row'} style={{'marginTop':'4%','marginBottom':'5%'}}>
                        <div className={'col-md-12 custom_div'}>
                            <div className={'col-md-5 col-md-offset-1'}>
                                <img alt={'Illustration'} width={'394px'} src={Illustration}/>
                            </div>
                            <form ref={(ref)=>this.form=ref}>
                                <div className={'col-md-4 col-md-offset-1 outer_login_form'}>
                                    <div className={'box-header'}>
                                        <p>Verify Mobile</p>
                                    </div>
                                    <div className={'login_form'}>
                                        <div>
                                            <div className="padding-bottom-15">
                                                We have sent OTP on
                                            </div>
                                            <p style={{'fontSize':'20px','fontWeight':'400'}}>+1{this.state.mobile}</p>
                                        </div>
                                        <div id="otpContainer">
                                            <div className={"padding-bottom-15 padding-top-20"}>OTP</div>
                                            <input className={"form-control email-text"} name={'otp'} placeholder={'Enter OTP'}></input>

                                        </div>
                                        <div className={'resend-option'} style={{'fontSize':'12px','paddingTop':'10px'}}>
                                            Still not received OTP?
                                            <span><a href={'javascript:void(0)'} onClick={this.otpcall}>Get via call</a></span>
                                            <span style={{'float':'right'}}><a href={'javascript:void(0)'} onClick={this.generateOtp}>Resend OTP</a></span>
                                        </div>
                                        <div className="padding-top-20" style={{"marginTop": "20px"}}>
                                            <button type="submit" onClick={this.postDataHandler} className="btn btn-lg common-btn practo-btn" id={"login"}>
                                                LOGIN
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>

        );
    }

}

const mapDispatchToProps = dispatch => {
    console.log("Inside mapDispatchToProps")
    return {
        onLoginSuccess: (user_obj) => dispatch({type: actionTypes.AUTH_ACTIVITY, user: user_obj, logged_in: true}),
    }
};


export default connect(null, mapDispatchToProps)(VerifyOTP);