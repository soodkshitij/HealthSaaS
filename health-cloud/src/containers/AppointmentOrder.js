import React, { Component } from 'react';
import NavBar from "./NavBar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import dateFormat from 'dateformat';
import TimeSlots from '../components/TimeSlots';
import {Redirect} from 'react-router-dom';
import * as API from "../api/api";
import connect from "react-redux/es/connect/connect";

class AppointmentOrder extends Component{

    constructor(props){
        super(props);
        console.log(props.match.params.id);
        this.state = {
            app_order:null
        }
    }

    componentDidMount(){
        API.getAppointmentForUser(null, this.props.match.params.id).then(response =>{
            console.log(response);
            this.setState({...this.state, app_order : response.data})
        });

    }



    render(){
        console.log(this.state);
        let f_date="";
        if (this.state.app_order != null){
            f_date = dateFormat(this.state.app_order.date,'dddd, d mmm yyyy');
        }
        return (
            <div>
                <NavBar active={{'landing_class':true}} header_prop={'secondary-nav-block'}/>
                { this.state.app_order ?
                <div className={'row'} style={{'backgroundColor':'#f0f0f5','minHeight':'625px'}}>
                    <div className={'col-md-4 col-md-offset-2'} style={{'backgroundColor':'#fff','marginTop':'60px','padding':'20px'}}>
                        <div className={'col-md-10'}>
                            <h5 style={{'fontSize':'20px'}} className={'bold'}>Appointment Timings</h5>
                            <div className={'row'}>
                                <div style={{'padding':'0px','marginTop':'10px'}} className={'col-md-12'}>
                                    <i className="fa fa-calendar" aria-hidden="true"></i>
                                    <span style={{'marginLeft':'10px'}}>{f_date}</span>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div style={{'padding':'0px','marginTop':'10px'}} className={'col-md-10'}>
                                    <i className="fa fa-clock-o" aria-hidden="true"></i>
                                    <span style={{'marginLeft':'10px'}}>{this.state.app_order.time_selected}</span>
                                </div>
                            </div>
                            <div style={{'margin':'10px 0px 0px 0px'}} className={'row'}>
                                <h5 style={{'fontSize':'20px'}} className={'bold'}>Doctor Details</h5>
                                <h5 className={'bold'}>{this.state.app_order.doctor_data.name}</h5>
                                <h5>{this.state.app_order.doctor_data.speciality}</h5>
                                <h5>{this.state.app_order.doctor_data.address} {this.state.app_order.doctor_data.city}</h5>
                            </div>
                        </div>
                    </div>
                    <div className={'col-md-4 col-md-offset-1'} style={{'marginTop':'60px','padding':'10px'}}>
                        <span style={{'fontSize':'20px','letterSpacing':'4px','width':'50%'}} className="text-center text-small bold item-tag current tag-margin">Ongoing</span>
                        <div className={'app-info-container col-md-11'}>
                            <span style={{'color':'black'}}>Patient's Name (Report will be generated with this name) *</span>
                            <input disabled={true} defaultValue={this.state.app_order.name} style={{'marginTop':'10px'}} className={"form-control email-text"} name={'name'} placeholder={'Patient Name'}></input>
                        </div>
                        <div className={'app-info-container col-md-11'}>
                            <span style={{'color':'black'}}>Mobile Number *</span>
                            <input disabled={true} defaultValue={this.state.app_order.mobile_number} style={{'marginTop':'10px'}} className={"form-control email-text"} name={'mobile'} placeholder={'Mobile Number'}></input>
                        </div>
                        <div className={'app-info-container col-md-11'}>
                            <span style={{'color':'black'}}>Email *</span>
                            <input disabled={true} defaultValue={this.state.app_order.email} style={{'marginTop':'10px'}} className={"form-control email-text"} name={'email'} placeholder={'Email'}></input>
                        </div>
                        {/*<div className={"app-info-container col-md-11"} style={{'marginTop':'20px'}}>*/}
                            {/*<button onClick={()=>this.postDataHandler()} type="submit" className="btn btn-lg common-btn practo-btn" id={"continue"}>*/}
                                {/*Book Appointment*/}
                            {/*</button>*/}
                        {/*</div>*/}
                    </div>
                </div>:
                    null}
                <Footer/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        logged_in: state.logged_in,
        user_obj : state.user
    };
};

export default connect(mapStateToProps)(AppointmentOrder);