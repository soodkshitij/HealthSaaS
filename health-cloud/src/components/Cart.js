import React from "react";



const Cart = (props) =>{
    return (
    <div className={'col-md-3'} style={{'backgroundColor':'#fff','marginTop':'20px', 'marginLeft':'20px','padding':'0px'}}>
        <div className={'selected_tests'} style={{'borderBottom':'1px solid #ccc','padding':'15px'}}>
            <h5 style={{'color':'rgb(0,0,0)'}}><span style={{'fontWeight':'600','fontSize':'16px'}}>Selected Tests</span></h5>
            <h5 style={{'color':'rgb(0,0,0)'}}><span style={{'fontWeight':'400','fontSize':'14px'}}>{props.lab_data.lab_name}</span></h5>
        </div>
        <div className={'test_details_cart'} style={{'borderBottom':'1px solid #ccc','padding':'15px'}}>
            <h5 style={{'color':'rgb(0,0,0)'}}><span style={{'fontWeight':'400','fontSize':'14px'}}>{props.lab_data.name}</span></h5>
            <span>Preparation</span><br></br>
            <span>{props.lab_data.preparation}</span>
        </div>
        <div className={'test_details_total'} style={{'borderBottom':'1px solid #ccc','padding':'15px'}}>
            <div className={'total_cart'} style={{'backgroundColor':'#f0f0f5','height':'40px','padding':'10px'}}>
                <span style={{'float':'left'}}>Total</span>
                <span style={{'float':'right'}}>{props.lab_data.price}</span>
            </div>
        </div>
    </div>
    )};

export default Cart;