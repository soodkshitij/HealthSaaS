import React, { Component } from 'react';
import NavBar from "./NavBar";
import Footer from "../components/Footer";
import Family from '../assets/family.png';
import AvailableTests from "./AvailableTests";


class HealthCheckup extends Component{


    render(){

        console.log("Available test render");
        console.log(this.props);
        let l_o = [0,3];

        let tests = l_o.map((val,idx) => {
            return <AvailableTests healthCheckList={true} limit={3} offset={val}/>
        });


        return (
            <div>
                <NavBar active={{'health_class':true}} header_prop={'secondary-nav-block'}/>
                <div className={'row health-checkup-container'}>
                    <div className={'col-md-5 col-md-offset-1'}>
                        <h1 className={'health-checkup-header'}>Affordable full body health checkups at home</h1>
                        <ul className="ct1-user-flow">
                            <li>
                                <span className={"circle icon-package"}></span>
                                <span className={"u-font-color--secondary"}>Choose a package</span>
                            </li>
                            <li>
                                <span className={"circle icon-date-time"}></span>
                                <span className={"u-font-color--secondary"}>Select date and time</span>
                            </li>
                            <li>
                                <span className={"circle icon-phlebo"}></span>
                                <span className="u-font-color--secondary">Sample is collected from home</span>
                            </li>
                            <li>
                                <span className={"circle icon-report"}></span>
                                <span className={"u-font-color--secondary"}>Report is emailed to you</span>
                            </li>
                        </ul>
                    </div>
                    <div className={'col-md-4 col-md-offset-1'}>
                        <img alt={'Family'} width={'394px'} src={Family}/>
                    </div>
                </div>

                <div className={'row health-checkup-packages'}>
                    <div className={'col-md-5 col-md-offset-1'}>
                        <span style={{'fontSize':'1.285em','marginRight':'10px'}}>Packages In</span>
                        <input type="text" className={'city-data-list'} defaultValue="San Jose" list="cities"></input>
                            <datalist id={"cities"}>
                                <option value="San Jose"></option>
                                <option value="Fremont"></option>
                                <option value="Milpitas"></option>
                                <option value="Mountain View"></option>
                            </datalist>
                    </div>
                </div>
                {tests}
                <Footer/>
            </div>

        );
    }

}

export default HealthCheckup;