import React, { Component } from 'react';
import NavBar from "./NavBar";
import Footer from "../components/Footer";
import * as API from "../api/api";
import DoctorInfo from "./DoctorInfo";
import DoctorFeedback from "../components/DoctorFeedback";
import {Redirect} from "react-router-dom";


class ViewDoctor extends Component {

    constructor(props){
        super(props);
        this.state = {
            profile: '',
            isInfo: true,
            redirect: false,
            feedbacks:[]
        }

        this.goToFeedback = this.goToFeedback.bind(this);
    }

    componentDidMount() {
        API.getDoctorProfile(this.props.match.params.id).then((response) => {
            // console.log('Response', response.data);
            this.setState({...this.state, profile: response.data});
        })
        API.getDoctorFeedback(this.props.match.params.id).then(response =>{
            this.setState({...this.state, feedbacks: response.data});
        })
    }

    goToFeedback() {
        // console.log(this.state.profile._id.$oid)
        this.setState({...this.state, redirect: true})
    }

    render() {
        let years = new Date().getFullYear() - this.state.profile.working_since;

        if (this.state.redirect) {
            return <Redirect
                to={{
                    pathname: `/doctors/${this.state.profile._id.$oid}/feedback`,
                    state: this.state.profile,

                }} />
        }
        return(
            <div>
                <NavBar active={{'landing_class':true}} header_prop={'secondary-nav-block'}/>
                <div className={"container-fluid r_doctor_profile"}>
                    <div className={"col-md-8 col-md-offset-2 r_doctor_container"}>
                        <div className={"well r_card col-md-12"}>
                            <div className={"col-md-2"}>
                                <img src={"https://res.cloudinary.com/df07l7xud/image/upload/v1544001959/medium_thumbnail.png"} />
                            </div>
                            <div className={"col-md-10"}>
                                <p className={"r_doctor_name"}>{this.state.profile.name}</p>
                                <p>{this.state.profile.qualification}</p>
                                <p className={"r_doctor_specs"}>
                                    <b>Specialization: </b>
                                    <span>{this.state.profile.speciality}</span>
                                </p>
                                <p className={"r_doctor_specs"}><b>Experience:</b> {years} years</p>
                                <p className={"r_doctor_specs"}><b>About:</b> {this.state.profile.tag_line}</p><br />
                            </div>

                            <div className={"col-md-2 pull-right"}>
                                <button className={"practo-btn common-btn r_feedback_btn"} onClick={this.goToFeedback}>Give Feedback</button>
                            </div>
                        </div>
                    </div>

                    <div className={"col-md-8 col-md-offset-2 r_doctor_info"}>
                        <div className={"col-12 r_section_btns"}>
                            <button className={this.state.isInfo ? 'r_info_feed r_tab_active' : 'r_info_feed'} onClick={() => this.setState({isInfo: true})}>Info</button>
                            <button className={!this.state.isInfo ? 'r_info_feed r_tab_active' : 'r_info_feed'} onClick={() => this.setState({isInfo: false})}>Feedback</button>
                        </div>
                        <div>
                            {this.state.isInfo && this.state.profile ?
                                <DoctorInfo profile={this.state.profile}/> :
                                <DoctorFeedback feedbacks={this.state.feedbacks} profile={this.state.profile}/>
                            }
                        </div><br />
                    </div>


                </div>
                <Footer/>
            </div>
        )
    }
}

export default ViewDoctor;