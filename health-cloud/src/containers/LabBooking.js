import React, { Component } from 'react';
import NavBar from "./NavBar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import dateFormat from 'dateformat';
import TimeSlots from '../components/TimeSlots';
import {Redirect} from 'react-router-dom';
import * as API from "../api/api";

class LabBooking extends Component{

    constructor(props){
        super(props);
        console.log(props.match.params.id);
        let now = new Date();
        now.setDate(now.getDate() + 1);
        now.setHours(0,0,0,0);
        this.state = {
            lab_test:props.match.params.id,
            date_selected: now.getTime(),
            time_selected: null,
            redirect: false,
            date_selected_string: dateFormat(now, "ddd, dS mmm"),
            lab_details: {'name':'','lab_name':'','preparation':'','price':''}
        }
    }

    componentDidMount(){
        API.getLabsDetails(this.props.match.params.id).then(response =>{
            this.setState({...this.state, lab_details : response.data})
        });

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

    createDateFields(){
        let l_o = [1,2,3,4,5,6,7];

        let dates = l_o.map((val,idx) => {
            let now = new Date();
            now.setDate(now.getDate() + val);
            now.setHours(0,0,0,0);
            let d = dateFormat(now, "ddd, dS mmm");
            console.log(d);
            return (
                <li key={idx}>
                    <div onClick={()=> this.dateClickHandler(now.getTime())} className={'date-slider-dates'}>{d}</div>
                </li>
            );
        });
        return dates;
    }



    render(){
        if (this.state.redirect){
            return <Redirect to={{
                pathname: `/lab-booking/patient-details/${this.state.lab_test}`,
                state: this.state
            }}/>
        }


        console.log(this.props);
        let dates = this.createDateFields();
        console.log(dates);
        return (
            <div>
                <NavBar active={{'landing_class':true}} header_prop={'secondary-nav-block'}/>
                <div className={'row'} style={{'backgroundColor':'#f0f0f5','minHeight':'700px'}}>
                    <div className={'col-md-7 col-md-offset-1'} style={{'backgroundColor':'#fff','marginTop':'20px'}}>
                        <div className="c-order-progress-bar">
                            <ul>
                                <li className={"completed"}><span className={"circle"}></span>
                                    <span className={"text u-font-bold o-font-size--12"}>1. Select time slot</span>
                                </li>
                                <li><span className={"circle"}></span>
                                    <span className={"text u-font-bold o-font-size--12"}>2. Add Patient Details</span>
                                </li>
                                <li><span className={"circle"}></span>
                                    <span className={"text u-font-bold o-font-size--12"}>3. Select patient address</span>
                                </li>
                            </ul>
                        </div>
                        <div className={'row'} style={{'backgroundColor':'#f0f0f5'}}>
                            <div className={'col-md-12'} style={{'backgroundColor':'#fff','marginTop':'10px'}}>
                                <h5 style={{'color':'rgb(0,0,0)'}}>Package Selected: <span style={{'fontWeight':'600'}}>{this.state.lab_details.name}</span></h5>
                            </div>
                        </div>
                        <div className={'row'} style={{'backgroundColor':'#f0f0f5'}}>
                            <div className={'col-md-12'} style={{'backgroundColor':'#fff','marginTop':'10px','marginBottom':'30px'}}>
                                <div className={'date-slider'}>
                                    <ul id="lightSlider">
                                        {dates}
                                    </ul>
                                </div>
                                <TimeSlots timeClick={this.timeClickHandler}/>
                            </div>
                        </div>
                    </div>
                    <Cart lab_data={this.state.lab_details}/>
                </div>
                <Footer/>
            </div>
        );
    }

}

export default LabBooking;