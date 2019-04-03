import React, { Component } from 'react';
import NavBar from "./NavBar";
import { Link, Redirect } from 'react-router-dom';
import Footer from "../components/Footer";
import Illustration from '../assets/illustration.png';
import * as API from '../api/api';

class Register extends Component{

    state = {
        redirect: false,
        mobile : ''
    }

    constructor(props){
        super(props);
    }

    postDataHandler = (event) => {
        event.preventDefault();
        const form_data = new FormData(this.form);
        const data = {};
        for (let val of form_data.keys()){
            data[val] = form_data.get(val);
        }
        console.log(data);

        API.register(data).then(response =>{
            console.log(response);
            if (response.data.result){
                this.setState({redirect:true,mobile: this.mobileNode.value});
            }
            else{
                alert(response.data.message);
            }
        });

    }


    render(){
        if (this.state.redirect){
            return <Redirect to={`/verify-otp/?mobile=${this.state.mobile}`} />
        }


        return (
            <div>
                <NavBar active={{'landing_class':true}} header_prop={'secondary-nav-block'}/>
                <div className={'container'} style={{'marginTop':'20px','marginBottom':'20px'}}>
                    <div className={'row'}>
                        <div className={'col-md-12'}>
                            <div className={'col-md-9 login_register_header'}>
                                <span className={'login_register_header_span_left'}><a href={'/login'} className={'black'}>Login</a></span>
                                <span className={'login_register_header_span_right active'}><a href={"javascript:void(0)"} className={'blue'}>Register</a></span>
                            </div>
                        </div>
                    </div>
                    <div className={'row'} style={{'marginTop':'4%','marginBottom':'5%'}}>
                        <div className={'col-md-12 custom_div'}>
                            <div className={'col-md-5 col-md-offset-1'}>
                                <img width={'394px'} src={Illustration}/>
                            </div>
                            <form ref={(ref)=>this.form=ref}>
                                <div className={'col-md-4 col-md-offset-1 outer_login_form'}>
                                    <div className={'box-header'}>
                                        <p>Join Klinics</p>
                                    </div>
                                    <div className={'login_form'}>
                                        <div>
                                            <div className="padding-bottom-15">
                                                Full Name
                                            </div>
                                            <input className={"form-control full-name"} name={'fullName'} placeholder={'Full Name'}></input>
                                            <span id="fullNameErrorBlock" className="errorText textMuted error-block display-block"></span>
                                        </div>
                                        <div id="passwordContainer">
                                            <div className={"padding-bottom-15 padding-top-20"}>Create Password</div>
                                            <input className={"form-control email-text"} type={'password'} name={'password'} placeholder={'Password'}></input>
                                        </div>
                                        <div id="mobileNumberContainer">
                                            <div className={"padding-bottom-15 padding-top-20"}>Mobile Number</div>
                                            <div className={'row'} style={{'margin':'0'}}>
                                                <input className={'form-control col-md-3 countryCode'} style={{'width':'25%'}} value={'+1 (USA)'} disabled={true}></input>
                                                <input className={"form-control mobile col-md-6"} style={{'width':'75%'}} type={'number'} min={1000000000} maxLength={10} minLength={10} ref={(node) => this.mobileNode = node}  name={'mobile'} placeholder={'Mobile Number'}></input>
                                            </div>
                                        </div>
                                        <div className="padding-top-20 font-12 textMuted">
                                            <div className={"otp-flow"}>
                                                <div className="otp_flow">
                                                    <input id="is_doctor" name="is_doctor" type="checkbox" value="true"></input>
                                                    <label htmlFor="otp_flow"></label>
                                                </div>
                                                <label className={"mousePointer font-14 textMuted line-height-20"} htmlFor="otp_flow">Are you a doctor?</label>
                                            </div>
                                        </div>
                                        <div className="padding-top-20" style={{"marginTop": "20px"}}>
                                            <button type="submit" onClick={this.postDataHandler} className="btn  btn-lg common-btn practo-btn" id={"register"}>
                                                Send OTP
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

export default Register;