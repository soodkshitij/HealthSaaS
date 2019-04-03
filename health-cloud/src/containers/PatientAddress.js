import React, { Component } from 'react';
import NavBar from "./NavBar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import * as API from "../api/api";
import {Redirect} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

class PatientAddress extends Component{


   constructor(props){
       super(props);
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
        console.log(this.props.location.state);
        console.log(this.props.user_obj);

        let s_data = Object.assign({}, this.props.location.state);
        delete s_data.lab_details
        delete s_data.redirect
        console.log("s_data",s_data);

        API.insertBookTest({...data, ...s_data, 'user_id': this.props.user_obj.user_id}).then(response=>{
           console.log(response);
        });
    }





    render(){
        console.log("Inside patient address");
        console.log(this.props);
        return (
            <div>
                <NavBar active={{'health_class':true}} header_prop={'secondary-nav-block'}/>
                <div className={'row'} style={{'backgroundColor':'#f0f0f5','minHeight':'600px'}}>
                    <div className={'col-md-7 col-md-offset-1'} style={{'backgroundColor':'#fff','marginTop':'20px','minHeight':'700px'}}>
                        <div className="c-order-progress-bar">
                            <ul>
                                <li className={"completed"}><span className={"circle"}></span>
                                    <span className={"text u-font-bold o-font-size--12"}>1. Select time slot</span>
                                </li>
                                <li className={"completed"}><span className={"circle"}></span>
                                    <span className={"text u-font-bold o-font-size--12"}>2. Add Patient Details</span>
                                </li>
                                <li className={"completed"}><span className={"circle"}></span>
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
                                    <hr></hr>
                                    <h6 className={'bold_grey'}>Patient Details</h6>
                                    <h6>{this.props.location.state.name}</h6>
                                    <h6>{this.props.location.state.age}, {this.props.location.state.gender}</h6>
                                    <h6>{this.props.location.state.email}</h6>
                                </div>
                            </div>
                            <form ref={(ref)=>this.form=ref}>
                                <div className={'col-md-8 col-md-offset-1'}>
                                    <h4 style={{'textAlign':'center','fontWeight':'800','marginBottom':'30px'}}>Add Patient Address</h4>
                                    <div className={'row'}>
                                        <div className={'patient-info-container col-md-11'}>
                                            <span style={{'color':'grey'}}>Patient's Mobile *</span>
                                            <input required={true} style={{'marginTop':'10px'}} defaultValue={this.props.location.state.mobile} className={"form-control email-text"} name={'mobile'} placeholder={'ex. 9999999999'}></input>
                                        </div>
                                    </div>
                                    <div className={'row'} style={{'marginTop':'20px'}}>
                                        <div className={'patient-info-container col-md-11'}>
                                            <span style={{'color':'grey'}}>House Address *</span>
                                            <textarea required={true} style={{'marginTop':'10px'}} rows={4} cols={60} name={'address'}></textarea>
                                        </div>
                                    </div>
                                    <div className={'row'} style={{'marginTop':'20px'}}>
                                        <div className={'patient-info-container col-md-11'}>
                                            <span style={{'color':'grey'}}>Address Type*</span>
                                            <div style={{'marginTop':'10px'}}>
                                                <input checked={true} className={'radio_gender'} type="radio" value="HOME" name="address_type"/> Home
                                                <input className={'radio_gender'} type="radio" value="WORK" name="address_type"/> Work
                                                <input className={'radio_gender'} type="radio" value="OTHER" name="address_type"/> Other
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'row'} style={{'marginTop':'20px'}}>
                                        <div className={'patient-info-container col-md-11'}>
                                            <span style={{'color':'grey'}}>Zipcode *</span>
                                            <input required={true} style={{'marginTop':'10px','width':'75%'}} className={"form-control email-text"} name={'zipcode'} placeholder={'ex. 201301'}></input>
                                        </div>
                                    </div>
                                    <div className="padding-top-20" style={{"marginTop": "20px"}}>
                                        <button onClick={this.postDataHandler} type="submit" className="btn btn-lg common-btn practo-btn" id={"continue"}>
                                            Book Test
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

const mapStateToProps = state => {
    return {
        logged_in: state.logged_in,
        user_obj : state.user
    };
};

export default connect(mapStateToProps)(PatientAddress);