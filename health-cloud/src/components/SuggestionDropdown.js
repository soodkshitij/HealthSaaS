import React from "react";


const SuggestionDropDown = (props)=>{

    let default_sug = ['Dentist','Cardiologist','ENT(Otorhinolaryngologist)','General Physician', 'Pediatrician','Gynecologist','Obstetrician'];
    let sugg = [];


    if (props.search_term ==undefined || props.search_term.length ==0 ) {
        sugg = default_sug.map((val, idx) => {
            return (
                <a key={idx} href={`/search/?search_term=${val}&city=${props.city}`}>
                    <div className={'c-omni-suggestion-item'}>
                        <div className={'row'} style={{'margin': '0px'}}>
                            <div className={'col-md-1 circle-bak'}>
                                <i className="fa-i fa fa-search" aria-hidden="true"></i>
                            </div>
                            <div className={'col-md-8'} style={{'paddingTop': '5px'}}>
                                <span>{val}</span>
                            </div>
                            <div className={'col-md-2 pull-right'} style={{'paddingTop': '5px', 'color': '#787887'}}>
                                <span>Speciality</span>
                            </div>
                        </div>
                    </div>
                </a>
            );
        });
    }

    else {
        sugg = props.sugg.map((val, idx) => {
            return (
                <a key={idx} href={`/search/?search_term=${props.search_term}&city=${props.city}`}>
                    <div className={'c-omni-suggestion-item'}>
                        <div className={'row'} style={{'margin': '0px'}}>
                            <div className={'col-md-1 circle-bak'}>
                                <i className="fa-i fa fa-search" aria-hidden="true"></i>
                            </div>
                            <div className={'col-md-8'} style={{'paddingTop': '5px'}}>
                                <span>{val.clinic}</span>
                            </div>
                        </div>
                    </div>
                </a>
            );
        });
    }

    return(
        <div className={'suggestion-block'}>
            <div className={'top_sugg'}>Top Suggestions</div>
            {sugg}
        </div>
    )
}

export default SuggestionDropDown;