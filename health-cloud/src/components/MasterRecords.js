import React from "react";
import dateFormat from 'dateformat';


const MasterRecords = (props) =>{
    console.log(props.uploaded_records);
    let records_div = props.uploaded_records.map((val, idx) =>{
        let date = new Date(val.date)
        let f_date = dateFormat(date, "mmm");
        return (
            <a href={`/drive/records/record/${val._id.$oid}`}>
            <div key={idx} className={'upload-header'} style={{'height':'80px'}}>
                <div className={'row'} style={{'margin':'0px'}}>
                    <div className={'col-md-1'} style={{'background':'#f0f0f5','margin':'10px','padding':'3px'}}>
                        <div className={'text-cal black center'}>{date.getDate()}</div>
                        <div className={'text-cal grey center'}>{f_date}</div>
                    </div>
                    <div className={'col-md-4'} style={{'margin':'10px'}}>
                        <div className={'text-drive-record bold black'}>{val.title}</div>
                        <div className={'text-drive-record grey'}>Records for {val.record_for.toUpperCase()}</div>
                    </div>
                    <div className={'col-md-3'} style={{'margin':'10px'}}>
                        <div className={'text-drive-number grey'}>{val.sub_records_length} Uploads</div>
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
export default MasterRecords;