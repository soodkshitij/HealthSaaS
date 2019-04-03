import React, { Component } from 'react';
import NavBar from "./NavBar";
import Footer from "../components/Footer";
import * as API from "../api/api";
import connect from "react-redux/es/connect/connect";
import NoRecord from "../components/NoRecords";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import SideBarDrive from "../components/SideBarDrive";
import MasterRecords from "../components/MasterRecords";


class MedicalRecords extends Component{

    constructor(props){
        super(props);
        this.state = {
            modal: false,
            report_selected:null,
            title:'',
            record_for:'',
            date:'',
            existing_records:[]
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }


    componentDidMount(){
        console.log("State inside medical records modal");
        console.log(this.state);
        API.getMasterRecords(this.props.user_obj.user_id).then(response =>{
            this.setState({...this.state, existing_records: response.data})
        })
        console.log(this.state);
    }

    openModal() {
        this.setState({...this.state, modal: true});
    }

    closeModal() {
        this.setState({...this.state, modal: false});
    }

    submitRecord(){
        let data = {'report_type':this.state.report_selected,'title':this.state.title,'date':new Date(this.state.date).getTime(),
        'record_for':this.state.record_for,'user_id':this.props.user_obj.user_id}
        API.insertRecord(data).then(response=>{
            this.closeModal();
        })
        this.refreshPage();
    }

    refreshPage(){
        window.location.reload();
    }

    update_report(id){
        console.log(id);
        this.setState({...this.state, report_selected:id});
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
                        <SideBarDrive active={{'record_class':true}}/>
                        <div className={'col-md-8'} style={{'paddingRight':'0px','height':'550px','overflow':'auto'}}>
                            <div className={'upload-header'}>
                                <div className={'col-md-2 pull-right'} style={{'padding':'10px'}}>
                                    {/*<button data-toggle={"modal"} data-target={"#recordUploadModal"} style={{'lineHeight':'0px','height':'35px'}} className="btn btn-lg common-btn practo-btn">Upload Records</button>*/}
                                    <button style={{'lineHeight':'0px','height':'35px'}} className="btn btn-lg common-btn practo-btn" onClick={this.openModal}>Upload Records</button>
                                </div>
                            </div>
                            { this.state.existing_records.length ==0 ? <NoRecord message={"Sorry, No records shared yet"}/>:
                                <MasterRecords uploaded_records={this.state.existing_records}/>
                            }
                        </div>
                    </div>
                </div>
                {this.state.modal ?

                <div className="modal fade in" id="recordUploadModal" role="dialog" style={{"display": "block"}}>
                    <div className="modal-dialog modal-md" style={{'width':'450px'}}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Create Records</h4>
                            </div>
                            <div className="modal-body" style={{'padding':'20px'}}>
                                <input onChange={(e)=>this.setState({...this.state, title: e.target.value})} type={'text'} className={"form-control email-text"} placeholder={'Title'}></input>
                                <div className={'row'} style={{'marginTop':'10px'}}>
                                    <div className={'col-md-5'}>
                                        <input onChange={(e)=>this.setState({...this.state, record_for: e.target.value})} type={'text'} defaultValue={this.props.user_obj.name} className={"form-control email-text"} placeholder={'record_for'}></input>
                                    </div>
                                    <div className={'col-md-5 col-md-offset-1'} style={{'marginRight':'5px'}}>
                                        <DatePicker onChange={(e)=>this.setState({...this.state, date: e})}
                                            selected={this.state.date}
                                            placeholderText="Select a date"
                                            className={'form-control email-text'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type={'button'} style={{'width':'25%','height':'40px'}} className="btn btn-lg common-btn practo-btn" onClick={()=>this.submitRecord()}>Submit</button>
                                <button type={'button'} style={{'width':'25%','height':'40px'}} className="btn btn-lg common-btn practo-btn" onClick={this.closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                    : null }


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

export default connect(mapStateToProps)(MedicalRecords);