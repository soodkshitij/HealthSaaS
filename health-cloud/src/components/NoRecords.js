import NoRecordsImage from "../assets/no_record_logo.svg";
import React from "react";

const NoRecord =(props) =>{
    return (
        <div className={'row'} style={{'marginRight':'0px'}}>
            <div className={'col-md-12'} style={{'paddingRight':'0px','marginTop':'20px','height':'100%'}}>
                <div className={'no-upload'}>
                    <img src={NoRecordsImage} height={110} alt={'no-records'}></img>
                    <p style={{'textAlign':'center','marginTop':'10px'}}>{props.message}</p>
                </div>
            </div>
        </div>
    );
}

export default NoRecord;