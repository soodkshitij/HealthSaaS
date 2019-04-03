import React, { Component } from 'react';
import NavBar from "./NavBar";
import Footer from "../components/Footer";
import dateFormat from 'dateformat';
import * as API from "../api/api";
import connect from "react-redux/es/connect/connect";
import {Redirect} from "react-router-dom";

class AppointmentBooking extends Component{

    constructor(props){
        super(props);
        console.log(props.match.params.id);
        this.state ={
            name: this.props.user_obj.name,
            mobile_number : this.props.user_obj.mobile_number,
            email :'',
            redirect:false
        }
    }


    postDataHandler = () => {
        console.log(this.state);
        let data = {...this.state, 'date':this.props.location.state.date_selected,'time_selected':this.props.location.state.time_selected,
        user_id: this.props.user_obj.user_id, 'doctor_id': this.props.match.params.id};
        console.log(data);
        API.insertAppointment(data).then(response =>{
            console.log(response.data);
            this.setState({...this.state, redirect:true});
        })
    }

    render(){
        if (this.state.redirect){
            return <Redirect to={{
                pathname: `/drive/appointments`,
            }}/>
        }

        console.log(this.state);
        console.log(this.props);
        let f_date = dateFormat(this.props.location.state.date_selected,'dddd, d mmm yyyy');


        return (
            <div>
                <NavBar active={{'landing_class':true}} header_prop={'secondary-nav-block'}/>
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
                                    <span style={{'marginLeft':'10px'}}>{this.props.location.state.time_selected}</span>
                                </div>
                            </div>
                            <div style={{'margin':'10px 0px 0px 0px'}} className={'row'}>
                                <h5 style={{'fontSize':'20px'}} className={'bold'}>Doctor Details</h5>
                                <h5 className={'bold'}>{this.props.location.state.profile.name}</h5>
                                <h5>{this.props.location.state.profile.speciality}</h5>
                                <h5>{this.props.location.state.profile.address} {this.props.location.state.profile.city}</h5>
                            </div>
                        </div>
                    </div>
                    <div className={'col-md-4 col-md-offset-1'} style={{'marginTop':'60px','padding':'10px'}}>
                        <h5 style={{'fontSize':'20px'}} className={'bold'}>Confirm Appointment</h5>
                        <div className={'app-info-container col-md-11'}>
                            <span style={{'color':'black'}}>Patient's Name (Report will be generated with this name) *</span>
                            <input defaultValue={this.props.user_obj.name} required={true} style={{'marginTop':'10px'}} className={"form-control email-text"} name={'name'} placeholder={'Patient Name'}
                                   onChange={(event) => this.setState({...this.state, name: event.target.value})}></input>
                        </div>
                        <div className={'app-info-container col-md-11'}>
                            <span style={{'color':'black'}}>Mobile Number *</span>
                            <input defaultValue={this.props.user_obj.mobile_number} required={true} style={{'marginTop':'10px'}} className={"form-control email-text"} name={'mobile'} placeholder={'Mobile Number'}
                                   onChange={(event) => this.setState({...this.state, mobile_number: event.target.value})}></input>
                        </div>
                        <div className={'app-info-container col-md-11'}>
                            <span style={{'color':'black'}}>Email *</span>
                            <input required={true} style={{'marginTop':'10px'}} className={"form-control email-text"} name={'email'} placeholder={'Email'}
                                   onChange={(event) => this.setState({...this.state, email: event.target.value})}></input>
                        </div>
                        <div className={"app-info-container col-md-11"} style={{'marginTop':'20px'}}>
                            <button onClick={()=>this.postDataHandler()} type="submit" className="btn btn-lg common-btn practo-btn" id={"continue"}>
                                Book Appointment
                            </button>
                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps)(AppointmentBooking);