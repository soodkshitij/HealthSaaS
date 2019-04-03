import React from "react";
import dateFormat from 'dateformat';


const SubRecords = (props) =>{
    console.log(props.sub_records);
    let records_div = props.sub_records.map((val, idx) =>{
        return (
            <a target={'_blank'} href={`https://res.cloudinary.com/df07l7xud/image/upload/${val.public_id}`}>
                <div className={'uploaded_thumb col-md-3 uploaded_block'}>
                    <div className={'uploaded_doc_header'}>
                        {val.report_selected_string}
                    </div>
                    <div className={'inner-image-block'}>
                        <img style={{'textAlign':'center'}} src={`http://res.cloudinary.com/df07l7xud/image/upload/w_160,h_160,f_jpg/${val.public_id}`}></img>
                    </div>
                    <div className={'uploaded_doc_header'}>
                    </div>
                </div>
            </a>
        );
    });


    return (
        <div className={'row'} style={{'marginLeft':'0px','marginTop':'20px'}}>
            {records_div}
        </div>
    );
}
export default SubRecords;