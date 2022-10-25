import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TrackingSteps from "../components/TrackingSteps.js";

function TrackingScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  return (
    <div>
      <TrackingSteps step1 step2></TrackingSteps>
      <div className="trackorder">
        <div>
          <ul className="cart-list-container">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <h3>SHOPPING CART</h3>
              <div>
                <h2>
                  <em>PRICE</em>
                </h2>
              </div>
            </li>
            {cartItems.length === 0 ? (
              <div>
                <b>Cart is Empty</b>
              </div>
            ) : (
              cartItems.map((item) => (
                <li key={item.name}>
                  <div className="cart-image">
                    <img src={item.image} alt="product" />
                  </div>
                  <div className="cart-name">
                    <Link to={"/products/" + item.product}>
                      <div>{item.name}</div>
                    </Link>
                    <div>Qty: {item.qty}</div>
                  </div>
                  <div className="cart-price">{item.price}</div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
      <div className="trackorder-actions">
        <h3>
          SubTotal ({cartItems.reduce((a, c) => a + Number(c.qty), 0)} items) :
          # {cartItems.reduce((a, c) => a + c.price * c.qty, 0) + 15.5}
        </h3>
      </div>
    </div>
  );
}

export default TrackingScreen;
