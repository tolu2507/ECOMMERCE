import React, { useState } from "react";
// import data from "../data";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShipping } from "../actions/cartActions.js";
import CheckOutSteps from "../components/CheckoutSteps.js";

function ShippingScreen(props) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({address, city, postalcode, country}));
    navigate('/payment');
  };

  return (
    <div>
      <CheckOutSteps step1 step2></CheckOutSteps>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <div className="form-sign">
                {" "}
                <h3>SHIPPING</h3>
              </div>
            </li>
            <li>
              <label htmlFor="address">
                <h3>Address</h3>
              </label>
              <input
                type="text"
                name="address"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="city">
                <h3>City</h3>
              </label>
              <input
                type="text"
                name="city"
                id="city"
                onChange={(e) => setCity(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="postalcode">
                <h3>Postalcode</h3>
              </label>
              <input
                type="text"
                name="postalcode"
                id="postalcode"
                onChange={(e) => setPostalcode(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="country">
                <h3>Country</h3>
              </label>
              <input
                type="text"
                name="country"
                id="country"
                onChange={(e) => setCountry(e.target.value)}
              />
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
export default ShippingScreen;
