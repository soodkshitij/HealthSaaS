import React from 'react'

const TestIndividual = (props) =>{
    console.log("test indi ",props);
    console.log(props.lab);
        return(
        <div key={props.idx} className={'c-package col-md-4'}>
            <article>
                <header className="c-package__header u-t-white">
                    <h3 className="u-title-font u-t-bold">{props.lab.name}</h3>
                    <p className="u-p-v-10">{props.lab.sub_heading}</p>
                </header>
                <main className="c-package__main">
                    <div className="u-d-flex-start">
                        <i className="fa fa-flask tab-icon-package c-icon" aria-hidden="true"></i>
                        <div className="u-m-l-10">
                            <h4 className="u-t-bold">Includes {props.lab.tests.length} Tests</h4>
                            <ul className="u-m-t-5">
                                <li>{props.lab.tests[0]}</li>
                                <li>{props.lab.tests[1]}</li>
                                <li>{props.lab.tests[2]}</li>
                                <li className="u-grey_3-text u-smallest-font">and {props.lab.tests.length - 3} other tests</li>
                            </ul>
                        </div>
                    </div>
                    <div className="u-border-b-lavender u-p-v-5"></div>
                    <div className="c-package__main__lab">
                        <i className="fa fa-home tab-icon-package c-icon" aria-hidden="true"></i>
                        <div className="u-m-l-10">
                            <p>Powered by <strong className="u-t-bold">{props.lab.lab_name}</strong></p>
                            <p className="u-lh-normal">• Online reports in {props.lab.name.reports_time}</p>
                            <p>• {props.lab.accreditation}</p>
                        </div>
                    </div>
                </main>
                <footer className="c-package__footer">
                    <div className="c-package__footer__controls">
                        <span className="u-title-font u-t-bold" style={{"color":"#00a500"}}>{props.lab.price}</span>
                        {(!props.healthCheckList)?
                        <a className="c-button--transparent" data-package-id="5" href="/health-checkup">Explore</a>:
                        <a className="c-button--transparent" data-package-id="5" href={`/lab-booking/${props.lab._id.$oid}`}>Book</a>}
                    </div>
                </footer>
            </article>

        </div>
        );
}

export default TestIndividual;