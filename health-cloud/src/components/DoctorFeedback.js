import React, { Component } from 'react';


const DoctorFeedback = (props) => {
    console.log(props);
    return (
        <div className={"well col-md-12 r_info_feed_container"}>
            <div className={"col-md-12"}>
                <span className={"r_feed_header"}>Feedback for Dr. M. R. Pujari</span>&nbsp;&nbsp;
                <span className={"r_feed_count"}><strong>({props.feedbacks.length} results)</strong></span>
                <span className={"col-md-12 r_helper_text"}>These are patient’s opinions and do not necessarily reflect the doctor’s medical capabilities</span>
                <hr className={"r_feed_hr"} />
            </div>
            <div className={"col-md-12"}>
                {props.feedbacks ?
                    props.feedbacks.map((value, index) => (
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
                    )) : null
                }
            </div>

        </div>
    )
}

export default DoctorFeedback;