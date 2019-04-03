import React, { Component } from 'react';
import NavBar from "./NavBar";
import Footer from "../components/Footer";
import * as API from "../api/api";
import connect from "react-redux/es/connect/connect";
import NoRecord from "../components/NoRecords";
import SideBarDrive from "../components/SideBarDrive";
import LabTestsSidebar from "../components/LabTestsSidebar";
import AppointmentSidebar from "../components/AppointmentSidebar";


class Appointments extends Component{

    constructor(props){
        super(props);
        this.state = {
            appointment : []
        }

    }


    componentDidMount(){
        API.getAppointmentForUser(this.props.user_obj.user_id, null).then(response =>{
            console.log(response);
            this.setState({...this.state, appointment: response.data});
        })
    }



    render(){

        console.log(this.props);
        console.log(this.state);
        return (
            <div>
                <NavBar active={{'drive_class':true}} header_prop={'secondary-nav-block'}/>
                <div className={'row'} style={{'backgroundColor':'#f0f0f5'}}>
                    <div className={'row'}>
                        <div className={'col-md-10 col-md-offset-1'} style={{'backgroundColor':'#fff','marginTop':'0px'}}>
                            <div className={'row_header'}>
                                <div className={'user_card'}>
                                    <div className={'col-md-2'}>
                                        <div className={'product_name'}>
                                            Your Drive
                                        </div>
                                    </div>
                                    <div className={'col-md-4 col-md-offset-1'}>
                                        <div className={'user_details_card'}>
                                            <div className="user-name">{this.props.user_obj.name}</div>
                                            <div className="mobile_number">{this.props.user_obj.mobile_number}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'row'} id={'sideBarAppContainer'}>
                        <SideBarDrive active={{'appointment':true}}/>
                        <div className={'col-md-8'} style={{'paddingRight':'0px','height':'550px','overflow':'auto'}}>
                            {this.state.appointment.length == 0 ?
                                <NoRecord message={"Sorry, No appointments scheduled yet"}/> :
                                <AppointmentSidebar appointment={this.state.appointment}/>
                            }
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

export default connect(mapStateToProps)(Appointments);