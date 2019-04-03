import React, { Component } from 'react';
import NavBar from "./NavBar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import * as API from "../api/api";
import {Redirect} from "react-router-dom";

class PatientDetails extends Component{


   constructor(props){
       super(props);
       this.state = {
           name:'',
           age:'',
           age_type:'',
           mobile:'',
           email:'',
           gender:'',
           redirect:false
       }
   }

    postDataHandler = (event) => {
        event.preventDefault();
        const form_data = new FormData(this.form);
        const data = {};
        for (let val of form_data.keys()){
            data[val] = form_data.get(val);
            console.log(val);
        }
        console.log(data);
        this.setState({name: data['name'], age: data['age'], age_type : data['age_type'],
        mobile : data['mobile'], email: data['email'], gender: data['gender'],redirect:true})
    }





    render(){
        console.log("Inside patient details");
        console.log(this.props);
        console.log(this.state);
        if (this.state.redirect){
            return <Redirect to={{
                pathname: `/lab-booking/patient-address/${this.props.location.state.lab_test}`,
                state: {...this.state, ...this.props.location.state}
            }}/>
        }
        return (
            <div>
                <NavBar active={{'health_class':true}} header_prop={'secondary-nav-block'}/>
                <div className={'row'} style={{'backgroundColor':'#f0f0f5','minHeight':'600px'}}>
                    <div className={'col-md-7 col-md-offset-1'} style={{'backgroundColor':'#fff','marginTop':'20px','minHeight':'600px'}}>
                        <div className="c-order-progress-bar">
                            <ul>
                                <li className={"completed"}><span className={"circle"}></span>
                                    <span className={"text u-font-bold o-font-size--12"}>1. Select time slot</span>
                                </li>
                                <li className={"completed"}><span className={"circle"}></span>
                                    <span className={"text u-font-bold o-font-size--12"}>2. Add Patient Details</span>
                                </li>
                                <li><span className={"circle"}></span>
                                    <span className={"text u-font-bold o-font-size--12"}>3. Select patient address</span>
                                </li>
                            </ul>
                        </div>
                        <div className={'col-md-12'}>
                            <div className={'col-md-3'} style={{'backgroundColor':'#f7f7fa'}}>
                                <div className={'col-md-12'}>
                                    <h5 className={'bold_grey'}>Details</h5>
                                    <h6 className={'bold_grey'}>Lab</h6>
                                    <h6>{this.props.location.state.lab_details.lab_name}</h6>
                                    <hr></hr>
                                    <h6 className={'bold_grey'}>Time Slot</h6>
                                    <h6>{this.props.location.state.date_selected_string}</h6>
                                    <h6>{this.props.location.state.time_selected}</h6>
                                </div>
                            </div>
                            <form ref={(ref)=>this.form=ref}>
                                <div className={'col-md-8 col-md-offset-1'}>
                                    <h4 style={{'textAlign':'center','fontWeight':'800','marginBottom':'30px'}}>Add Patient Details</h4>
                                    <div className={'row'}>
                                        <div className={'patient-info-container col-md-11'}>
                                            <span style={{'color':'grey'}}>Patient's Name (Report will be generated with this name) *</span>
                                            <input required={true} style={{'marginTop':'10px'}} className={"form-control email-text"} name={'name'} placeholder={'Patient Name'}></input>
                                        </div>
                                    </div>
                                    <div className={'row'} style={{'marginTop':'20px'}}>
                                        <div className={'patient-info-container col-md-5'}>
                                            <span style={{'color':'grey'}}>Patient's Mobile *</span>
                                            <input required={true} style={{'marginTop':'10px'}} className={"form-control email-text"} name={'mobile'} placeholder={'ex. 9999999999'}></input>
                                        </div>
                                        <div className={'patient-info-container col-md-3'}>
                                            <span style={{'color':'grey'}}>Age *</span>
                                            <input required={true} style={{'marginTop':'10px'}} className={"form-control email-text"} name={'age'} type={'number'}></input>
                                        </div>
                                        <div className={'patient-info-container col-md-3'}>
                                            <span style={{'color':'grey'}}>Age Type*</span>
                                            <select className={'age-dropdown'} name={'age_type'}>
                                                <option value={'years'}>Years</option>
                                                <option value={'months'}>Months</option>
                                                <option value={'days'}>Days</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={'row'} style={{'marginTop':'20px'}}>
                                        <div className={'patient-info-container col-md-11'}>
                                            <span style={{'color':'grey'}}>Gender*</span>
                                            <div style={{'marginTop':'10px'}}>
                                                <input checked={true} className={'radio_gender'} type="radio" value="MALE" name="gender"/> Male
                                                <input className={'radio_gender'} type="radio" value="FEMALE" name="gender"/> Female
                                                <input className={'radio_gender'} type="radio" value="OTHER" name="gender"/> Other
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'row'} style={{'marginTop':'20px'}}>
                                        <div className={'patient-info-container col-md-11'}>
                                            <span style={{'color':'grey'}}>Email (Your reports will be sent on this email address) *</span>
                                            <input required={true} style={{'marginTop':'10px'}} className={"form-control email-text"} name={'email'} placeholder={'you@xyz.com'}></input>
                                        </div>
                                    </div>
                                    <div className="padding-top-20" style={{"marginTop": "20px"}}>
                                        <button onClick={this.postDataHandler} type="submit" className="btn btn-lg common-btn practo-btn" id={"continue"}>
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Cart lab_data={this.props.location.state.lab_details}/>
                </div>
                <Footer/>
            </div>
        );
    }

}

export default PatientDetails;