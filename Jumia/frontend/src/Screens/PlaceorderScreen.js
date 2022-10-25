import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import CheckOutSteps from "../components/CheckoutSteps.js";
import config from '../config.js';

const flutter_wave = config.FLUTTERWAVE_PUB

function PlaceOrderScreen(props) {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment } = cart;
  const config = {
    public_key: flutter_wave,
    tx_ref: Date.now(),
    amount: cartItems.reduce((a, c) => a + c.price * c.qty, 0) + 15.5,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "tolulopebamisile@gmail.com",
      phone_number: "07038968337",
      name: "tolulope bamisile",
    },
    customizations: {
      title: "my Payment Title",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  if (!shipping.address) {
    navigate("/shipping");
  }

  if (!payment.paymentMethod) {
    navigate("/payment");
  }

  useEffect(() => {
    return () => {
      //
    };
  }, []);

  const handleFlutterPayment = useFlutterwave(config);

  const checkOutHandler = async () => {
    handleFlutterPayment({
      callback: (response) => {
        navigate("/trackorder");
        console.log(response);
        closePaymentModal(); // this will close the modal programmatically
      },
      onClose: () => {},
    });
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
            $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0) + 15.5}
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

// export default function App() {

//   return (
//     <div className="App">
//      <h1>Hello Test user</h1>

//       <button
//         onClick={() => {
//           handleFlutterPayment({
//             callback: (response) => {
//                console.log(response);
//                 closePaymentModal() // this will close the modal programmatically
//             },
//             onClose: () => {},
//           });
//         }}
//       >
//         Payment with React hooks
//       </button>
//     </div>
//   );
// }
