import React, { Component } from 'react';
import TestIndividual from '../components/TestsIndividual';
import * as API from '../api/api';

class AvailableTests extends Component{

    state = {
        labs: []
    }


    constructor(props){
        super(props)
    }

    componentDidMount() {
        console.log("CDM available tests");
        API.getLabs(this.props.limit, this.props.offset).then(response => {
            console.log(response.data);
            this.setState({labs : response.data});
        });
    }


    renderAvailableTests(){
        console.log("Available test render");
        console.log(this.props);
        let tests = this.state.labs.map((lab, idx) => {
            return <TestIndividual key={idx} {...this.props} lab={lab} idx={idx}/>;
        });


        return(
            <>
            <div className={'row'}>
                {(this.props.healthCheckList == undefined)?
                <div className={'title-block'}>
                    <h2 className={'center title-font'}>Affordable full body health checkups at home</h2>
                </div>:null}
                <div className={'container'}>
                    <div className={'c-packages-list'}>
                        {tests}
                    </div>
                </div>
                {(this.props.healthCheckList == undefined)?
                <div style={{'margin':'0 auto','width':'200px','padding':'20px'}}>
                    <a style={{'textAlign':'center','display':'block'}} className="c-button--not-transparent" href={'/health-checkup'}>More Packages</a>
                </div>:null}
            </div>
                {(this.props.healthCheckList == undefined)?
            <div className={'row'} style={{'backgroundColor':'#fafafa','margin':'40px 0px 40px 0px' }}>
                <div className={'col-md-4'}>
                    <div className={'title-block'}>
                        <h2 className={'title-font'} style={{'letterSpacing ':'1.5px','fontSize':'28px','textAlign':'center'}}>Instant appointment with doctors.<b>Guaranteed.</b></h2>
                    </div>
                    <div style={{'margin':'0 auto','width':'250px','padding':'20px'}}>
                        <a style={{'textAlign':'center','display':'block'}} className="c-button--not-transparent" href={'/'}>Find me the right doctor</a>
                    </div>
                </div>
                <div className={'col-md-4'}>
                    <div className={'title-block'}>
                        <h2 className={'title-font'} style={{'letterSpacing':'1.5px','fontSize':'28px','textAlign':'center'}}>Skip the waiting room. <b>Chat with a doctor</b></h2>
                    </div>
                    <div style={{'margin':'0 auto','width':'250px','padding':'20px'}}>
                        <a style={{'textAlign':'center','display':'block'}} className="c-button--not-transparent" href={'/'}>Chat now</a>
                    </div>
                </div>
                <div className={'col-md-4'}>
                    <div className={'title-block'}>
                        <h2 className={'title-font'} style={{'letterSpacing':'1.5px','fontSize':'28px','textAlign':'center'}}>Store health records.<b>Digitally.</b></h2>
                    </div>
                    <div style={{'margin':'0 auto','width':'250px','padding':'20px'}}>
                        <a style={{'textAlign':'center','display':'block'}} className="c-button--not-transparent" href={'/'}>Drive</a>
                    </div>
                </div>
            </div>:null}
            </>
        );
    }


    render(){
        return (
            this.renderAvailableTests()
        );
    }

}

export default AvailableTests;