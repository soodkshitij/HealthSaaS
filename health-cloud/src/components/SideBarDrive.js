import React from "react";


const SideBarDrive = (props) => {
    return (
            <div className={'col-md-2 col-md-offset-1'} style={{'borderRight':'1px solid #e0e0e5','padding':'0px'}}>
                <div className={'sidebar bg-white'}>
                    <a className={'sidebar-link'} href={'/drive/records'}>
                        <div className={props.active.record_class ? 'sidebar-item active heading-four separator' : 'sidebar-item heading-four separator'}>
                            Medical records
                        </div>
                    </a>
                    <a className={'sidebar-link'} href={'/drive/appointments'}>
                        <div className={props.active.appointment ? 'sidebar-item active heading-four separator' : 'sidebar-item heading-four separator'}>
                            Appointments
                        </div>
                    </a>
                    <a className={'sidebar-link'} href={'/drive/lab-tests'}>
                        <div className={props.active.lab_class ? 'sidebar-item active heading-four separator' : 'sidebar-item heading-four separator'}>
                            Lab Tests
                        </div>
                    </a>
                    <a className={'sidebar-link'} href={'/drive/online-consultation'}>
                        <div className="sidebar-item heading-four separator">
                            Online Consultation
                        </div>
                    </a>
                    <a className={'sidebar-link'} href={'/drive/feedback'}>
                        <div className="sidebar-item heading-four separator">
                            Feedback
                        </div>
                    </a>
                </div>
            </div>
    );
}
export default SideBarDrive;