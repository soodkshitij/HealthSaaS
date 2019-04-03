import React, { Component } from 'react';
import NavBar from "./NavBar";
import connect from "react-redux/es/connect/connect";
import * as API from '../api/api'
import {Redirect} from "react-router-dom";

class GiveFeedback extends Component {

    constructor(props){
        super(props);
        this.state = {
            profile: this.props.location.state,
            recommend: '',
            problem: '',
            feedback: '',
            'redirect':false
        }

        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.submitFeedback = this.submitFeedback.bind(this);
    }

    componentDidMount() {

    }

    handleCheckbox(recommend) {
        this.setState({...this.state, recommend})
    }

    submitFeedback() {
        console.log(this.state);
        let data = {'doctor_id':this.state.profile._id.$oid,'recommend':this.state.recommend,'problem':this.state.problem,'feedback':this.state.feedback, 'name':this.props.user_obj.name,'user_id':this.props.user_obj.user_id}
        API.insertFeedback(data).then(response =>{
            console.log(response);
            this.setState({...this.state, redirect:true});
        });
    }

    render() {

        if (this.state.redirect){
            return <Redirect to={{
                pathname: `/doctors/${this.state.profile._id.$oid}`
            }}/>
        }

        return(
            <div>
                <NavBar active={{'landing_class':true}} header_prop={'secondary-nav-block'}/>
                <div className={"fluid-container r_feed_body"}>
                    <div className={"well container r_form_container"}>
                        <div className={"row r_form_body"}>
                            <div className={"col-md-12 r_form_heading"}>
                                <span className={"col-md-12 r_doctor_exp"}>How was your appointment experience with</span>
                                <span className={"col-md-12 r_doctor_exp"}>{this.state.profile.name}</span>
                                <span className={"col-md-12 r_helper_text"}>Your feedback will help over 1 lac people choose the right doctor, daily.</span>
                            </div>
                            <div className={"col-md-12 r_form_content"}>
                                <div className={"col-md-12 r_qns"}>
                                    <span className={"r_qn_no"}>Q1.</span>&nbsp;&nbsp;&nbsp;
                                    <span className={"r_qn_text"}>Would you like to recommend the doctor?</span>
                                    <span className={"r_qn_no"}>*</span>
                                </div>
                                <div className={"col-md-12 r_option"}>
                                    <button onClick={() => this.handleCheckbox('Yes')} className={this.state.recommend == 'Yes' ? "r_active_checkbox" : "r_inactive_checkbox"}><i className={"fa fa-thumbs-up"}/>&nbsp;&nbsp;&nbsp;Yes</button>
                                    <button onClick={() => this.handleCheckbox('No')} className={this.state.recommend == 'No' ? "r_active_checkbox" : "r_inactive_checkbox"}><i className={"fa fa-thumbs-up"}/>&nbsp;&nbsp;&nbsp;No</button>
                                </div>
                                <div className={"col-md-12 r_qns r_next_qn"}>
                                    <span className={"r_qn_no"}>Q2.</span>&nbsp;&nbsp;&nbsp;
                                    <span className={"r_qn_text"}>For which health problem/treatment did you visit?</span>
                                    <span className={"r_qn_no"}>*</span>
                                </div>
                                <div className={"col-md-12 r_option"}>
                                    <textarea placeholder={"e.g. Stomach Ache, Body pain"} rows={"3"} className={"form-control input-md"} maxLength={"250"} onChange={(event) => this.setState({problem: event.target.value})}></textarea>
                                </div>
                                <div className={"col-md-12 r_qns r_next_qn"}>
                                    <span className={"r_qn_no"}>Q3.</span>&nbsp;&nbsp;&nbsp;
                                    <span className={"r_qn_text"}>Tell us about your experience with the doctor.</span>
                                    <span className={"col-md-12 r_helper_text"}>eg. Share relevant stories which made you appreciate 'doctor friendliness'</span>
                                </div>
                                <div className={"col-md-12 r_option"}>
                                    <textarea placeholder={"Start typing here..."} rows={"7"} className={"form-control input-md"} maxLength={"250"} onChange={(event) => this.setState({feedback: event.target.value})}></textarea>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className={"row r_user_info"}>
                            <div>
                                <input className={"input-md"} defaultValue={this.props.user_obj.name} />
                            </div>
                            <div className={"r_break"}>
                                <input className={"input-md"} placeholder={"Email address"}  defaultValue={this.props.user_obj.email}/>
                            </div>
                            <div className={"r_break"}>
                                <input className={"input-md"} placeholder={"Phone number"} defaultValue={this.props.user_obj.mobile_number} />
                            </div>
                            <div className={"col-md-3 r_next_qn"}>
                                <button onClick={this.submitFeedback} className={"practo-btn common-btn"}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    console.log(state.user)
    return {
        logged_in: state.logged_in,
        user_obj : state.user
    };
};

// export default GiveFeedback;
export default connect(mapStateToProps)(GiveFeedback);