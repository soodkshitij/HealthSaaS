import React, { Component } from 'react';
import NavBar from "./NavBar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import dateFormat from 'dateformat';
import TimeSlots from '../components/TimeSlots';
import {Redirect} from 'react-router-dom';
import * as API from "../api/api";
import connect from "react-redux/es/connect/connect";

class LabOrder extends Component{

    constructor(props){
        super(props);
        console.log(props.match.params.id);
        this.state = {
            lab_order:null
        }
    }

    componentDidMount(){
        API.getLabTestsForUser(null, this.props.match.params.id).then(response =>{
            this.setState({...this.state, lab_order : response.data})
        });

    }



    render(){
        console.log(this.props);
        let f_date="";
        if (this.state.lab_order != null){
            f_date = dateFormat(this.state.lab_order.date,'dddd, d mmm yyyy');
        }
        return (
            <div>
                <NavBar active={{'drive_class':true}} header_prop={'secondary-nav-block'}/>
                <div className={'row'} style={{'backgroundColor':'#f0f0f5','minHeight':'625px'}}>
                    <div className={'col-md-8 col-md-offset-2'} style={{'backgroundColor':'#fff','marginTop':'20px','padding':'30px','textAlign':'center'}}>
                        <span style={{'fontSize':'20px','letterSpacing':'4px','width':'50%'}} className="text-center text-small bold item-tag current tag-margin">Ongoing</span>
                    </div>
                    { this.state.lab_order ?
                    <>
                    <div className={'col-md-8 col-md-offset-2'} style={{'backgroundColor':'#fff','marginTop':'20px','padding':'30px'}}>
                        <div className={'col-md-6'}>
                            <h5 style={{'fontSize':'20px'}} className={'bold'}>Test Timings</h5>
                            <div className={'row'}>
                                <div style={{'padding':'0px','marginTop':'10px'}} className={'col-md-12'}>
                                    <i className="fa fa-calendar" aria-hidden="true"></i>
                                    <span style={{'marginLeft':'10px'}}>{f_date}</span>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div style={{'padding':'0px','marginTop':'10px'}} className={'col-md-10'}>
                                    <i className="fa fa-clock-o" aria-hidden="true"></i>
                                    <span style={{'marginLeft':'10px'}}>{this.state.lab_order.time_selected}</span>
                                </div>
                            </div>
                        </div>
                        <div className={'col-md-6'}>
                            <h5 style={{'fontSize':'20px'}} className={'bold'}>Preparations</h5>
                            <h5 className={'bold'}>{this.state.lab_order.lab_data.name}</h5>
                            <span>{this.state.lab_order.lab_data.preparation}</span>
                        </div>
                    </div>
                    <div className={'col-md-8 col-md-offset-2'} style={{'backgroundColor':'#fff','marginTop':'20px','padding':'30px','lineHeight':'2'}}>
                        <div className={'col-md-6'}>
                            <h5 style={{'fontSize':'20px'}} className={'bold'}>Lab Details</h5>
                            <h5 className={'bold'}>{this.state.lab_order.lab_data.lab_name}</h5>
                            <span>Price <b>{this.state.lab_order.lab_data.price}</b></span>
                        </div>
                        <div className={'col-md-6'}>
                            <h5 style={{'fontSize':'20px'}} className={'bold'}>Patient Details</h5>
                            <span>Booking Reference - {this.state.lab_order._id.$oid}</span>
                            <br></br>
                            <span>Booked for <b>{this.state.lab_order.name}</b></span>
                        </div>
                    </div>
                    </>
                    : null}
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

export default connect(mapStateToProps)(LabOrder);