import React, { Component } from 'react';
import NavBar from "./NavBar";
import Footer from "../components/Footer";
import {Redirect} from 'react-router-dom';
import * as API from "../api/api";
import connect from "react-redux/es/connect/connect";
import NoRecord from "../components/NoRecords";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import SideBarDrive from "../components/SideBarDrive";
import MasterRecords from "../components/MasterRecords";
import SubRecords from "../components/SubRecords";
import dateFormat from "dateformat";


class MedicalRecordIndividual extends Component{

    constructor(props){
        super(props);
        this.state = {
            modal: false,
            report_selected:null,
            reports:[],
            master_record_id: this.props.match.params.id,
            master_record:null,
            file_to_upload: null
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }


    componentDidMount(){
        console.log("State inside medical records modal");
        console.log(this.state);
        API.getMasterRecordById(this.state.master_record_id).then(response =>{
            console.log(response);
            this.setState({...this.state, master_record:response.data})
        })
        console.log(this.state);
        console.log("sub record");
        API.getSubRecord(this.state.master_record_id).then(response =>{
            console.log(response);
            this.setState({...this.state, reports:response.data})
        })
    }

    openModal() {
        if (this.state.master_record !=null) {
            this.setState({...this.state, modal: true});
        }
    }

    closeModal() {
        this.setState({...this.state, modal: false});
    }

    submitRecord(){
        const data = new FormData();
        data.append('report_selected',this.state.report_selected);
        data.append('master_record_id',this.state.master_record_id);
        data.append('file', this.state.file_to_upload, this.state.file_to_upload.name)
        API.insertSubRecord(data).then(response =>{
            console.log(response);
            this.closeModal();
            this.refreshPage();
        })
    }


    refreshPage(){
        window.location.reload();
    }

    update_report(id){
        console.log(id);
        this.setState({...this.state, report_selected:id});
    }

    setFile(e){
        console.log(e);
        console.log(e.target.files[0]);
        this.setState({...this.state, file_to_upload: e.target.files[0]})
    }


    render(){

        console.log(this.props);
        console.log(this.state);

        let f_date = "";
        if (this.state.master_record !=null) {
            let date_to_show_in_header = new Date(this.state.master_record.date)
            f_date = dateFormat(date_to_show_in_header, "d mmm yyyy");
        }

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
                                { this.state.master_record !=null ?
                                    <div className={'col-md-5'} style={{'padding':'2px'}}>
                                        <div className={'arrow col-md-1'}>
                                            <a href={'/drive/records'}>
                                                <i className="arrow-icon fa fa-arrow-left" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                        <div className={'arrow col-md-8'}>
                                            <div className={'record-info-header'}>
                                                {f_date}
                                            </div>
                                            <div className={'record-info-header bold'}>
                                                {this.state.master_record.title}
                                            </div>
                                            <div className={'record-info-header'}>
                                                {this.state.reports.length} records for {this.state.master_record.record_for}
                                            </div>
                                        </div>
                                    </div>: null}
                                <div className={'col-md-2 pull-right'} style={{'padding':'10px'}}>
                                    {/*<button data-toggle={"modal"} data-target={"#recordUploadModal"} style={{'lineHeight':'0px','height':'35px'}} className="btn btn-lg common-btn practo-btn">Upload Records</button>*/}
                                    <button style={{'lineHeight':'0px','height':'35px'}} className="btn btn-lg common-btn practo-btn" onClick={this.openModal}>Add More Records</button>
                                </div>
                            </div>
                            { this.state.reports.length ==0 ? <NoRecord message={"Sorry, No records shared yet"}/>:
                                <SubRecords sub_records={this.state.reports}/>
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
                                <input disabled={true} defaultValue={this.state.master_record.title} type={'text'} className={"form-control email-text"} placeholder={'Title'}></input>
                                <div className={'row'} style={{'marginTop':'10px'}}>
                                    <div className={'col-md-5'}>
                                        <input disabled={true} defaultValue={this.state.master_record.record_for} type={'text'} className={"form-control email-text"} placeholder={'record_for'}></input>
                                    </div>
                                    <div className={'col-md-5 col-md-offset-1'} style={{'marginRight':'5px'}}>
                                        <DatePicker
                                            selected={new Date(this.state.master_record.date)}
                                            placeholderText="Select a date"
                                            className={'form-control email-text'}
                                            disabled={'true'}
                                        />
                                    </div>
                                </div>
                                <div className={'row'} style={{'margin':'15px 0px 15px 0px'}}>
                                    <input onChange={(e)=> this.setFile(e)} name={'file_to_upload'} type={'file'}></input>
                                </div>
                                <div className={'record_type'} style={{'padding':'10px'}}>
                                    <span>Type of record</span>
                                    <div className={'row'} style={{'margin':'15px 0px 0px 0px'}}>

                                        { this.state.report_selected === 1 ?
                                        <div onClick={()=>this.update_report(1)} className={'col-md-4 report_upload_option_select active'} style={{'textAlign':'center'}}>
                                            <i className="fa blue_icon fa-file-text report_icon c-icon" aria-hidden="true"></i>
                                            <br></br>
                                            <span className={'report_icon_text'}>Report</span>
                                        </div> :
                                            <div onClick={()=>this.update_report(1)} className={'col-md-4 report_upload_option_select'} style={{'textAlign':'center'}}>
                                                <i className="fa fa-file-text report_icon c-icon" aria-hidden="true"></i>
                                                <br></br>
                                                <span className={'report_icon_text'}>Report</span>
                                            </div> }
                                        { this.state.report_selected === 2 ?
                                        <div onClick={()=>this.update_report(2)} className={'col-md-4 report_upload_option_select active'} style={{'textAlign':'center'}}>
                                            <i className="fa blue_icon fa-list-alt report_icon c-icon" aria-hidden="true"></i>
                                            <br></br>
                                            <span className={'report_icon_text'}>Prescription</span>
                                        </div>:
                                            <div onClick={()=>this.update_report(2)} className={'col-md-4 report_upload_option_select'} style={{'textAlign':'center'}}>
                                                <i className="fa fa-list-alt report_icon c-icon" aria-hidden="true"></i>
                                                <br></br>
                                                <span className={'report_icon_text'}>Prescription</span>
                                            </div> }
                                        { this.state.report_selected === 3 ?
                                        <div onClick={()=>this.update_report(3)} className={'col-md-4 report_upload_option_select active'} style={{'textAlign':'center'}}>
                                            <i className="fa blue_icon fa-file-pdf-o report_icon c-icon" aria-hidden="true"></i>
                                            <br></br>
                                            <span className={'report_icon_text'}>Invoice</span>
                                        </div>:
                                            <div onClick={()=>this.update_report(3)} className={'col-md-4 report_upload_option_select'} style={{'textAlign':'center'}}>
                                                <i className="fa report_icon fa-file-pdf-o report_icon c-icon" aria-hidden="true"></i>
                                                <br></br>
                                                <span className={'report_icon_text'}>Invoice</span>
                                            </div> }
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

export default connect(mapStateToProps)(MedicalRecordIndividual);