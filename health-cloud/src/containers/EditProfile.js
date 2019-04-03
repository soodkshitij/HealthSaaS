import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import React, { Component } from 'react';
import NavBar from "./NavBar";
import Footer from "../components/Footer";
import {Redirect} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import * as API from '../api/api';

class EditProfile extends Component{

    constructor(props){
        super(props);
        this.state = {
            image: null,
            name: '',
            mobile_number: '',
            email: '',
            gender: 'Male',
            blood_group: 'O+',
            addr_1: '',
            addr_2: '',
            city: '',
            state: '',
            zip_code: '',
            dob:''
        }

        this.updateChanges = this.updateChanges.bind(this);
    }

    choosePhoto = () => {
        this.fileInput.click();
    }

    componentDidMount(){
        API.getUserProfile(this.props.user_obj.user_id).then(response =>{
            if (response.data.user_profile!=null){
                console.log("not null user profile");
                this.setState({...this.state, ...response.data.user_profile});
                console.log(this.state);
            }
        })
    }

    updateChanges() {
        console.log(this.state);
        console.log(this.props.user_obj);
        let dob = new Date(this.state.dob).getTime();
        if (isNaN(dob)){
            dob = null;
        }

        let data = {'_id': this.props.user_obj.user_id,'dob':dob,'email':this.state.email, 'gender': this.state.gender,'blood_group':this.state.blood_group,
        'addr_1':this.state.addr_1,'addr_2':this.state.addr_2,'city':this.state.city,'state':this.state.state,'zip_code':this.state.zip_code};
        console.log(data);

        if (this.state.image !=null){
            console.log("uploading picture and data");
            const f_data = new FormData();
            f_data.append('user_id', data._id);
            f_data.append('file', this.state.image, "p_image")
            API.uploadProfilePicture(f_data).then(response =>{
                console.log(response);
                data['image'] = response.data.public_id;
                API.updateProfile(data).then(r =>{
                    console.log(r);
                })
            });
        }
        else {
            console.log("not uploading pictuire");
            API.updateProfile(data).then(r =>{
                console.log(r);
            })

        }


    }

    render() {
        console.log("render u_profile");
        console.log(this.state);
        console.log(this.props.user_obj);

        let f_image ="https://res.cloudinary.com/df07l7xud/image/upload/v1544001959/medium_thumbnail.png";
        if (this.state.image != null && this.state.image.length >0){
            f_image = `https://res.cloudinary.com/df07l7xud/image/upload/v1544001959/${this.state.image}`;
        }

        return(
            <div className={"r_whole_body"}>
                <NavBar active={{'landing_class':true}} header_prop={'secondary-nav-block'}/>
                <div className={"well container r_profile_container"}>
                    <div className={"col-md-12 r_profile_header"}>
                        <span className={"col-md-10 r_header"}>Accounts</span>
                        <span className={"col-md-2 r_edit_save"}>
                            <button className={"pull-right"} onClick={this.updateChanges}>Save Changes</button>
                        </span>
                    </div>
                    <hr className={"r_feed_hr"} />
                    <div className={"container-fluid r_image_section"}>
                        <div className={"col-md-5"}>
                            <div className={"r_input_label"}>Profile photo</div>
                            <div className={"col-md-12 r_img_container"}>
                                <span className={"col-md-3"}>
                                    <img id={"r_profile_img"} src={f_image}/>

                                </span>
                                <span className={"col-md-7 r_upload_pic_content"}>
                                    <p className={"r_input_label"}>Pick a photo from your computer</p>
                                    <input type="button" id={"r_upload_pic"} value={"Add a Photo"} onClick={this.choosePhoto}/>
                                    <input ref={(fileInput) => this.fileInput = fileInput} type={"file"} className={"hidden"} name={"photo"} onChange={(event) => this.setState({...this.state, image: event.target.files[0]})}/>
                                </span>
                            </div>
                        </div>
                        <div className={"col-md-7"}>
                            <div className={"r_input_label"}>Name</div>
                            <input disabled={true} type={"text"} className={"form-control input-xs r_profile_input"} defaultValue={this.props.user_obj.name}
                                   onChange={(event) => this.setState({...this.state, name: event.target.value})}
                            />
                        </div>
                    </div>
                    <hr />
                    <div className={"container-fluid"}>
                        <div className={"col-md-4"}>
                            <div className={"r_input_label"}>Phone Number</div>
                            <input disabled={true} type={"text"} className={"form-control input-xs r_profile_input"} defaultValue={this.props.user_obj.mobile_number}
                                   onChange={(event) => this.setState({...this.state, mobile_number: event.target.value})}
                            />
                        </div>
                        <div className={"col-md-4"}>
                            <div className={"r_input_label"}>Email Address</div>
                            <input type={"text"} className={"form-control input-xs r_profile_input"} defaultValue={this.state.email}
                                   onChange={(event) => this.setState({...this.state, email: event.target.value})}
                            />
                        </div>
                        <div className={"col-md-4"}>
                            <div className={"r_input_label"}>Gender</div>
                            <select value={this.state.gender} className={"r_select"} onChange={(event) => this.setState({...this.state, gender: event.target.value})}>
                                <option value={"Male"}>Male</option>
                                <option value={"Female"}>Female</option>
                                <option value={"Others"}>Others</option>
                            </select>
                        </div>
                    </div><br />
                    <div className={"container-fluid"}>
                        <div className={"col-md-4"}>
                            <div className={"r_input_label"}>Date of birth</div>
                            <DatePicker onChange={(e)=>this.setState({...this.state, dob: e})}
                                        selected={this.state.dob}
                                        placeholderText="Select a date"
                                        className={'form-control r_profile_input'}
                            />
                        </div>
                        <div className={"col-md-4"}>
                            <div className={"r_input_label"}>Blood group</div>
                            <select value={this.state.blood_group} className={"r_select"} onChange={(event) => this.setState({...this.state, blood_group: event.target.value})}>
                                <option value={"O+"}>O+</option>
                                <option value={"A+"}>A+</option>
                                <option value={"B+"}>B+</option>
                                <option value={"O-"}>O-</option>
                                <option value={"A-"}>A-</option>
                                <option value={"B-"}>B-</option>
                                <option value={"AB+"}>AB+</option>
                                <option value={"AB-"}>AB-</option>
                            </select>
                        </div>
                    </div>
                    <hr />
                    <div className={"container-fluid"}>
                        <div className={"col-md-12"} id={"r_sub_header"}>Address</div>
                        <div className={"col-md-12 r_profile_address"}>
                            <div className={"col-md-4"}>
                                <div className={"r_input_label"}>Address 1</div>
                                <input type={"text"} className={"form-control input-xs r_profile_input"} defaultValue={this.state.addr_1}
                                       onChange={(event) => this.setState({...this.state, addr_1: event.target.value})} />
                            </div>
                            <div className={"col-md-4"}>
                                <div className={"r_input_label"}>Address 2</div>
                                <input type={"text"} className={"form-control input-xs r_profile_input"} defaultValue={this.state.addr_2}
                                       onChange={(event) => this.setState({...this.state, addr_2: event.target.value})} />
                            </div>
                            <div className={"col-md-4"}>
                                <div className={"r_input_label"}>City</div>
                                <input type={"text"} className={"form-control input-xs r_profile_input"} defaultValue={this.state.city}
                                       onChange={(event) => this.setState({...this.state, city: event.target.value})} />
                            </div>
                        </div>
                        <div className={"col-md-12 r_profile_address"}>
                            <div className={"col-md-4"}>
                                <div className={"r_input_label"}>State</div>
                                <input type={"text"} className={"form-control input-xs r_profile_input"} defaultValue={this.state.state}
                                       onChange={(event) => this.setState({...this.state, state: event.target.value})} />
                            </div>
                            <div className={"col-md-4"}>
                                <div className={"r_input_label"}>Zip code</div>
                                <input type={"text"} className={"form-control input-xs r_profile_input"} defaultValue={this.state.zip_code}
                                       onChange={(event) => this.setState({...this.state, zip_code: event.target.value})} />
                            </div>
                        </div>
                    </div>

                </div>
                <Footer/>
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

// export default EditProfile;
export default connect(mapStateToProps)(EditProfile);