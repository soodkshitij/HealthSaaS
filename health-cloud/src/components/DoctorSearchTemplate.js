import React from "react";

const DoctorSearchTemplate = (props) =>{

    //o-label--default c-grid-list__item u-t-ellipsis

    let f_data = props.res.map((val, idx) =>{
       let f_back = "";
       let f_by = "";
       if (val.feedbacks.length > 0){
           f_back = "″"+val.feedbacks[0].feedback+"″";
           f_by = "- " + val.feedbacks[0].name;
       }

       let spec="";
       let spec_all ="";
       spec = val.profile.services.slice(0, 3).map((v, i) =>{
          return (
            <span className={'o-label--default c-grid-list__item u-t-ellipsis'}>{v}</span>
          );
       });

       if (val.profile.services.length > 0){
           spec_all = `View all ${val.profile.services.length} services`
       }




       return (
           <div className={'row'} style={{'backgroundColor':'#f0f0f5'}}>
               <div className={"col-md-8 col-md-offset-2 r_doctor_container"}>
                   <div className={"well r_card col-md-12"}>
                       <div className={"col-md-2"}>
                           <img src={"https://res.cloudinary.com/df07l7xud/image/upload/v1544001959/medium_thumbnail.png"} />
                       </div>
                       <div className={"col-md-10"}>
                           <a className={'blue'} href={`/doctors/${val.profile._id.$oid}`}>
                               <p style={{'margin':'10px 0px 10px 0px'}} className={"r_doctor_name"}>{val.profile.name}</p>
                           </a>
                           <p>{val.profile.qualification}</p>
                           <p className={"r_doctor_specs"}>
                               <b>Specialization: </b>
                               <span>{val.profile.speciality}</span>
                           </p>
                           <p className={"r_doctor_specs"}><b>Experience:</b> 99 years</p>
                           <p className={"r_doctor_specs"}><b>About:</b> {val.profile.tag_line}</p><br />
                           <div className={'speciality'}>
                               {spec}
                               <span className={'o-label--default c-grid-list__item u-t-ellipsis'}>
                                <a style={{'fontSize':'12px'}} className={'blue'} href={`/doctors/${val.profile._id.$oid}`}>
                                    {spec_all}
                               </a>
                               </span>
                           </div>
                           <div className={'review'}>
                               <span className={'black'}>{f_back}<span className={'bold'}>{f_by}</span></span>
                           </div>
                       </div>

                       <div className={"col-md-2 pull-right"}>
                           {/*<button className={"practo-btn common-btn r_feedback_btn"} onClick={this.goToFeedback}>Give Feedback</button>*/}
                       </div>
                   </div>
               </div>
           </div>
       );
    });

    return (
        <>
        {f_data}
        </>
    );
}

export default DoctorSearchTemplate;