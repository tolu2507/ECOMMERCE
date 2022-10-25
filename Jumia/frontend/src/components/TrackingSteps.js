import React from "react";

function TrackingSteps(props) {
    
    return (
      <div className="checkout-steps">
        <div className={props.step1 ? "active" : ""}>Payed</div>
        <div className={props.step2 ? "active" : ""}>Shipping</div>
        <div className={props.step3 ? "active" : ""}>Delivered</div>
      </div>
    );
}

export default TrackingSteps ;