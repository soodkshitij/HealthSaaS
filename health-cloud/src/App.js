import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import LandingPage from './containers/LandingPage';
import Login from './containers/Login';
import Register from "./containers/Register";
import VerifyOTP from "./containers/VerifyOTP";
import HealthCheckup from "./containers/HealthCheckup";
import LabBooking from "./containers/LabBooking";
import PatientDetails from "./containers/PatientDetails";
import PatientAddress from "./containers/PatientAddress";
import MedicalRecords from "./containers/MedicalRecords";
import MedicalRecordIndividual from "./containers/MedicalRecordIndividual";
import LabTests from "./containers/LabTests";
import LabOrder from "./containers/LabOrder";
import ViewDoctor from "./containers/ViewDoctor";
import GiveFeedback from "./containers/GiveFeedback";
import EditProfile from "./containers/EditProfile";
import SearchResults from "./containers/SearchResults";
import AppointmentBooking from "./containers/AppointmentBooking";
import Appointments from "./containers/Appointments";
import AppointmentOrder from "./containers/AppointmentOrder";
import Logout from "./containers/Logout";
import DriveFeedBack from "./containers/DriveFeedBack";


class App extends Component {
  render() {
    return (
    <div className={'container-fluid'}>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/verify-otp" component={VerifyOTP} />
        <Route exact path="/health-checkup" component={HealthCheckup} />
        <Route exact path="/lab-booking/:id" component={LabBooking} />
        <Route exact path="/lab-booking/patient-details/:id" component={PatientDetails} />
        <Route exact path="/lab-booking/patient-address/:id" component={PatientAddress} />
        <Route exact path="/drive/records" component={MedicalRecords} />
        <Route exact path={"/drive/records/record/:id"} component={MedicalRecordIndividual}/>
        <Route exact path="/drive/lab-tests" component={LabTests} />
        <Route exact path="/lab/order/:id" component={LabOrder} />
        <Route exact path="/doctors/:id" component={ViewDoctor} />
        <Route exact path="/doctors/:id/feedback" component={GiveFeedback} />
        <Route excact path="/edit-profile" component={EditProfile}/>
        <Route excact path="/search" component={SearchResults}/>
        <Route excact path="/appointment-booking/:id" component={AppointmentBooking}/>
        <Route exact path="/drive/appointments" component={Appointments} />
        <Route exact path="/drive/appointments/:id" component={AppointmentOrder} />
        <Route exact path="/drive/feedback" component={DriveFeedBack} />
     </div>
    );
  }
}

export default withRouter(App);
