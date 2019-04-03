import React, { Component } from 'react';
import TimeSlots from "../components/TimeSlots";
import dateFormat from "dateformat";
import {Redirect} from "react-router-dom";

class DoctorInfo extends Component {

    constructor(props){
        super(props);
        let now = new Date();
        now.setDate(now.getDate() + 1);
        now.setHours(0,0,0,0);
        this.state = {
            profile: '',
            calender: true,
            time_selected:null,
            date_selected:now.getTime(),
            date_selected_string: dateFormat(now, "ddd, dS mmm")
        }

        this.toggleCalendar = this.toggleCalendar.bind(this);
    }

    createDateFields(){
        let l_o = [1,2,3,4,5,6,7];

        let dates = l_o.map((val,idx) => {
            let now = new Date();
            now.setDate(now.getDate() + val);
            now.setHours(0,0,0,0);
            let d = dateFormat(now, "ddd, dS mmm");
            console.log(d);
            return (
                <li key={idx} >
                    <div onClick={()=> this.dateClickHandler(now.getTime())} className={'date-slider-dates'}>{d}</div>
                </li>
            );
        });
        return dates;
    }

    componentDidMount() {
        this.setState({...this.state, profile: this.props.profile})
    }

    toggleCalendar() {
        // this.setState(prevState => ({
        //     calendar: !prevState.calendar
        // }))
    }

    timeClickHandler = (event) =>{
        console.log("Inside time click");
        console.log(event.target.innerHTML);
        this.setState({...this.state, time_selected:event.target.innerHTML,redirect:true});
    }

    dateClickHandler = (date) =>{
        console.log(date);
        this.setState({...this.state, date_selected:date, date_selected_string: dateFormat(date, "ddd, dS mmm")});
    }

    render() {
        let d_a = this.createDateFields();
        let cal_class = "";
        // if (!this.state.calendar){
        //     cal_class = "hidden";
        // }
        if (this.state.redirect){
            return <Redirect to={{
                pathname: `/appointment-booking/${this.state.profile._id.$oid}`,
                state: this.state
            }}/>
        }

        console.log(this.state);
        return(
            <>
                { this.state.profile ?
                    <>
                        <div className={'well col-md-12 r_info_feed_container'}>
                            <div className={"col-md-12"}>
                                <div className={"col-md-5 r_address"}>
                                    <b>Address: </b>
                                    {this.state.profile.address}, {this.state.profile.city}
                                </div>
                                <div className={"col-md-3"}>
                                    <p><b>Mon - Sun</b></p>
                                    <p>9:00 AM - 9:30 PM</p>
                                </div>
                                <div className={"col-md-4 text-center"}>
                                    <p>$50</p>
                                </div>
                            </div>
                            <div className={"col-md-3 pull-right"}>
                                <button onClick={this.toggleCalendar} className={"common-btn practo-btn"}><i className={"fa fa-bolt"} /> Book an appointment</button>
                            </div>

                            <div className={`col-md-12 ${cal_class}`}>
                                <hr />
                                <div className={'date-slider'}>
                                    <ul id="lightSlider2">
                                        {d_a}
                                    </ul>
                                </div>
                                <p className={"text-center"}>Select a time slot to book an appointment</p>
                                <TimeSlots timeClick={this.timeClickHandler}/>
                                <hr />
                            </div>

                        </div>
                        <div className={"well col-md-12 r_doctor_other_info"}>
                            <div className={"col-md-12 r_sections"}>
                                <div className={"r_section_headers"}>
                                    <span className={"r_other_header"}>Services</span>
                                    <span className={"r_sections_count"}>View all ({this.state.profile.services.length})</span>
                                </div>
                                <div className={"r_list"}>
                                    {this.state.profile ?
                                        this.state.profile.services.map((value, index) => (
                                            <li className={"col-md-4 r_list_item"} key={index}>{value}</li>
                                        )) : null}
                                </div>
                            </div>

                            <div className={"col-md-12 r_sections"}>
                                <hr />
                                <div className={"r_section_headers"}>
                                    <span className={"r_other_header"}>Specializations</span>
                                    <span className={"r_sections_count"}>View all ({this.state.profile.specialization.length})</span>
                                </div>
                                <div className={"r_list"}>
                                    {this.state.profile ?
                                        this.state.profile.specialization.map((value, index) => (
                                            <li className={"col-md-4 r_list_item"} key={index}>{value}</li>
                                        )) : null}
                                </div>
                            </div>

                            <div className={"col-md-12 r_sections"}>
                                <hr />
                                <div className={"col-md-6 r_sub_sections"}>
                                    <div className={"r_section_headers"}>
                                        <span className={"r_other_header"}>Education</span>
                                    </div>
                                    <div className={"r_list"}>
                                        {this.state.profile ?
                                            this.state.profile.education.map((value, index) => (
                                                <li className={"r_list_item"} key={index}>{value}</li>
                                            )) : null
                                        }
                                    </div>
                                </div>
                                <div className={"col-md-6 r_sub_sections"}>
                                    <div className={"r_section_headers"}>
                                        <span className={"r_other_header"}>Memberships</span>
                                        <span className={"r_sections_count"}></span>
                                    </div>
                                    <div className={"r_list"}>
                                        {this.state.profile ?
                                            this.state.profile.professional_membership.map((value, index) => (
                                                <li className={"r_list_item"} key={index}>{value}</li>
                                            )) : null
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                    </>: null
                }
            </>

        )
    }
}

export default DoctorInfo;