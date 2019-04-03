import React from "react";


const TimeSlots =(props)=> {

    let slots = ['06:00 AM - 06:30 AM','06:30 AM - 07:00 AM','07:00 AM - 07:30 AM','07:30 AM - 08:00 AM',
    '08:00 AM - 08:30 AM','08:30 AM - 09:00 AM','09:00 AM - 09:30 AM','09:30 AM - 10:00 AM','10:00 AM - 10:30 AM',
    '10:30 AM - 11:00 AM','11:00 AM - 11:30 AM','11:30 AM - 12:00 PM','12:00 PM - 12:30 PM']

    let slots_div = slots.map((val, idx) =>{
        return (<div key={idx} onClick={props.timeClick} className="c-slot__tp__wrapper u-pad--less">
            <div data-aid="time-slot" className="c-slot__tp u-pointer">{val}</div>
        </div>)
    })

    return (
    <div className="c-slot__wrap clearfix">
        {slots_div}
    </div>
    );
}

export default TimeSlots;