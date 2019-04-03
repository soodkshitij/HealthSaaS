import React from 'react';

const DropDown = (props) =>{
    return (
        <div className={'col-md-2 pull-right'}>
            <div className={"drop-down"}>
                <div id={'dropDown'} className={"drop-down__button"}>
                    <span className={"drop-down__name"}>{props.user.name}</span>
                    <i style={{'marginLeft':'4px'}} className={"fa fa-caret-down"}></i>
                </div>
                <div className={"drop-down__menu-box"}>
                    <ul className={"drop-down__menu"}>
                        <li className={'drop-down__item'}>
                            <div className={'u_info'}>
                                <div className={'u_user_head'}>
                                    <div className={'u_name'}>
                                        {props.user.name}
                                    </div>
                                    <div className={'u_mobile'}>
                                        {props.user.mobile_number}
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className={'drop-down__item'}>
                            <div className={'u-d-item'}>
                                <a href={'/drive/appointments'}>My Appointments</a>
                            </div>
                        </li>
                        <li className={'drop-down__item'}>
                            <div className={'u-d-item'}>
                                <a href={'/drive/lab-tests'}>My Tests</a>
                            </div>
                        </li>
                        <li className={'drop-down__item'}>
                            <div className={'u-d-item'}>
                                <a href={'/drive/records'}>My Medical Records</a>
                            </div>
                        </li>
                        <li className={'drop-down__item'}>
                            <div className={'u-d-item'}>
                                <a href={'/drive/feedback'}>My Feedback</a>
                            </div>
                        </li>
                        <li className={'drop-down__item'}>
                            <div className={'u-d-item'}>
                                <a href={'/edit-profile'}>View / Update Profile</a>
                            </div>
                        </li>
                        <li className={'drop-down__item'}>
                            <div className={'u-d-item'}>
                                <a href={'/logout'}>Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DropDown;