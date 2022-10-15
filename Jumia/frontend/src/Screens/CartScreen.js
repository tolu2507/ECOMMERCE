import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { addToCart } from "../actions/cartActions";

function CartScreen(props) {

  const cart = useSelector(state => state.cart);
  const {cartItems} = cart

  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const qty = +searchParams.get("qty");
  const dispatch = useDispatch();
  useEffect(() => {
    if (qty) {
      dispatch(addToCart(id, qty));

      searchParams.delete("qty");
      setSearchParams(searchParams);
    }
    return () => {
      //
    };
  }, [dispatch, id, qty, searchParams, setSearchParams]);

  return (
    <div className="cart">
      <div className="cart-list">
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
                  <div>
                    <img src={item.image} alt="product" />
                  </div>
                  <div>
                    <div>{item.name}</div>
                    <div>
                      Qty:
                      <select>
                        {" "}
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>
                  </div>
                  <div className="cart-price">{item.price}</div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="cart-actions">
        <h3>
          SubTotal({cartItems.reduce((a, c) => a + c.qty, 0)} items) : ${" "}
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <button className="button" disabled={cartItems.length === 0}>
          proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartScreen;
