import React from "react";
import dateFormat from 'dateformat';


const FeedbackSidebar = (props) =>{
    let records_div = props.feedback.map((value, index) => {
        return (
            <div>
                <div key={index} className={"col-md-12"}>
                                <span className={"col-md-4 r_badge"}>
                                    {value.name.charAt(0)}
                                </span>
                    <span className={"col-md-11 r_feed"}>
                                    <h5 className={"col-md-12 r_feed_user"}>{value.name}</h5>
                                    <h5 className={"col-md-12 r_feed_problem"}>Visited for {value.problem}</h5>
                                    <h5 className={"col-md-12 r_feed_recommend"}>
                                        {value.recommend == 'Yes' ?
                                            <>
                                                <i className={"fa fa-thumbs-up"} />&nbsp;&nbsp;
                                                <span>I recommend this doctor</span>
                                            </> : null
                                        }
                                    </h5>
                                    <p className={"col-md-12 r_feed_msg"}>{value.feedback}</p>
                                </span>
                </div>
                <span className={"col-md-12"}>
                                <hr />
                            </span>
            </div>
        )
    });



    return (
        <>
        {records_div}
        </>
    );
}
export default FeedbackSidebar;