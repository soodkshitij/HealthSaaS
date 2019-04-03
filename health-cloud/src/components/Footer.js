import React from 'react'

const Footer = () =>{
    return (
      <div className={'r_footer'} style={{'backgroundColor':'#1d2869','minHeight':'50px','paddingTop':'5px','paddingBottom':'5px'}}>
          <div className={'footer-content'}>
            <i className={"fa fa-circle circle-logo-footer"} aria-hidden="true"></i><span className={"footer-logo"}>klinics</span><i className={"fa fa-circle circle-logo-footer"} aria-hidden="true"></i>
          </div>
          <div className={'copyright'}>
              <span>Copyright © 2018, klinics. </span><span>All rights reserved.</span>
          </div>
      </div>
    );
}

export default Footer;