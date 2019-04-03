import React from "react";
import dateFormat from 'dateformat';


const AppointmentSidebar = (props) =>{
    console.log(props.uploaded_records);
    let records_div = props.appointment.map((val, idx) =>{
        let date = new Date(val.date)
        let f_date = dateFormat(date, "mmm");
        return (
            <a key={idx} href={`/drive/appointments/${val._id.$oid}`}>
                <div className={'row'} style={{'margin':'0px'}}>
                    <div key={idx} className={'upload-header'} style={{'minHeight':'150px'}}>
                        <div className={'col-md-1'} style={{'background':'#f0f0f5','margin':'20px','padding':'3px'}}>
                            <div className={'text-cal black center'}>{date.getDate()}</div>
                            <div className={'text-cal grey center'}>{f_date}</div>
                        </div>
                        <div className={'col-md-8'} style={{'margin':'10px'}}>
                            <span className="text-center text-small bold item-tag current tag-margin">Ongoing</span>
                            <div className={'text-drive-record bold black'}>{val.doctor_data.name}</div>
                            <div className={'text-drive-record grey'}>Booking Reference <span className={'black bold'}>{val._id.$oid}</span></div>
                            <div className={'text-drive-record grey'}>Lab Visit {date.toString().split(' ')[0]} {val.time_selected}</div>
                            <div className={'text-drive-record grey'}>Booked for {val.name} at {val.doctor_data.clinic_name} </div>
                        </div>
                    </div>
                </div>
            </a>
        );
    });


    return (
        <>
        {records_div}
        </>
    );
}
export default AppointmentSidebar;