import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import DropDown from '../components/DropDown';

class NavBar extends Component{

    renderHeader(props){
        console.log(this.props);
        return (
                <div className={props.header_prop}>
                    <div className={'secondary-nav'}>
                        <div className={'row'}>
                            <div style={{'minWidth':'40px'}} className={'nav-link-block'}>
                                <a target={'_blank'} className={'nav-links-inactive'} href={'http://localhost:5000'}>FAQ's</a>
                            </div>
                            <div className={'nav-link-block'}>
                                <a className={this.props.active.drive_class ? 'nav-links-active' : 'nav-links-inactive'} href={'/drive/records'}>Medical Records</a>
                            </div>
                            <div className={'nav-link-block'}>
                                <a className={this.props.active.health_class ? 'nav-links-active' : 'nav-links-inactive'} href={'/health-checkup'}>Book tests & checkups</a>
                            </div>
                            <div className={'nav-link-block'}>
                                <a className={this.props.active.chat_class ? 'nav-links-active' : 'nav-links-inactive'} href={'/consult'}>Chat with a doctor </a>
                            </div>
                            <div className={'nav-link-block'}>
                                <a className={this.props.active.landing_class ? 'nav-links-active' : 'nav-links-inactive'} href={'/'}>Book appointment</a>
                            </div>
                        </div>
                    </div>

                <div className={'row navbar'}>
                    <Link to={'/'}>
                        <div className={"col-md-2 col-md-offset-1 logo-block"}>
                            <i className={'fa fa-circle circle-logo'} aria-hidden="true"></i>
                            <span className={"logo"}>klinics</span>
                            <i className={'fa fa-circle circle-logo'} aria-hidden="true"></i>
                        </div>
                    </Link>
                    {(this.props.logged_in === true) ? <DropDown user={this.props.user_obj}></DropDown> :
                        <div className={'login-block col-sm-2 pull-right'}>
                            <a href={'/login'}><span>Login / Sign Up</span></a>
                        </div>
                    }
                </div>
            </div>
        );
    }

    render(){
        return (
            this.renderHeader(this.props)
        );
    }

}

const mapStateToProps = state => {
    return {
        logged_in: state.logged_in,
        user_obj : state.user
    };
};

// const mapDispatchToProps = dispatch => {
//     return {
//         onAddedPerson: (name, age) => dispatch({type: actionTypes.ADD_PERSON, personData: {name: name, age: age}}),
//         onRemovedPerson: (id) => dispatch({type: actionTypes.REMOVE_PERSON, personId: id})
//     }
// };


export default connect(mapStateToProps)(NavBar);