import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import CheckOutSteps from "../components/CheckoutSteps.js";

function PlaceOrderScreen(props) {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment } = cart;

  if (!shipping.address) {
    navigate("/shipping");
  }

  if (!payment.paymentMethod) {
    navigate("/payment");
  }

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      //
    };
  }, []);

  const checkOutHandler = () => {
    navigate("/trackorder");
  };

  return (
    <div>
      <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping</h3>
            <div>
              {cart.shipping.address},{cart.shipping.city},
              {cart.shipping.postalcode},{cart.shipping.country}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>Payment Method:{cart.payment.paymentMethod}</div>
          </div>
          <div>
            <ul className="cart-list-container">
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
        <div className="placeorder-actions">

          <h3>
            SubTotal({cartItems.reduce((a, c) => a + Number(c.qty), 0)} items) :
            $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0) + 15.50}
          </h3>
          <button
            onClick={checkOutHandler}
            className="button"
            disabled={cartItems.length === 0}
          >
            Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
