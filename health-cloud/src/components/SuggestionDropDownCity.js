import React from "react";


const SuggestionDropDownCity= (props)=>{

    let default_sug = ['San Jose','Fremont','Milpitas','Mountain View'];
    let sugg = [];

    sugg = default_sug.map((val,idx) =>{
        return (
            <div key={idx} onClick={()=>props.handler(val)} className={'c-omni-suggestion-item'}>
                <div className={'row'} style={{'margin': '0px'}}>
                    <div className={'col-md-1 circle-bak'}>
                        <i className="fa-i fa fa-search" aria-hidden="true"></i>
                    </div>
                    <div className={'col-md-8'} style={{'paddingTop': '5px'}}>
                        <span>{val}</span>
                    </div>
                    <div className={'col-md-2'} style={{'paddingTop': '5px', 'color': '#787887'}}>
                        <span>City</span>
                    </div>
                </div>
            </div>
        );
    });

    return(
        <div className={'suggestion-block'} style={{'paddingRight':'0px'}}>
            {sugg}
        </div>
    )
}

export default SuggestionDropDownCity;