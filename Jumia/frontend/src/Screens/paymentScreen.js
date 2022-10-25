import React, { useState } from "react";
// import data from "../data";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions.js";
import CheckOutSteps from "../components/CheckoutSteps.js";

function PaymentScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod({paymentMethod}));
    navigate('/placeorder');
  };

  return (
    <div>
      <CheckOutSteps step1 step2 step3></CheckOutSteps>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <div className="form-sign">
                {" "}
                <h3>paymentMethod</h3>
              </div>
            </li>
            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="Flutterwave"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="paymentMethod">Flutterwave</label>
              </div>
            </li>
            <li>
              <button type="submit" className="button">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
export default PaymentScreen;
