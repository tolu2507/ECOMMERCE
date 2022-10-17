import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const qty = +searchParams.get("qty");
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
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
  const navigate = useNavigate()

  const checkOutHandler = () => {
    navigate("/signin?redirect=shipping")
  }

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
                <div className="cart-image">
                  <img src={item.image} alt="product" />
                </div>
                <div className="cart-name">
                  <Link to={"/products/" + item.product}>
                    <div>{item.name}</div>
                  </Link>
                  <div>
                    Qty:
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {" "}
                      {[...Array(item.inStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      className="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
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
          SubTotal({cartItems.reduce((a, c) => a + Number(c.qty), 0)} items) : ${" "}
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <button onClick={checkOutHandler} className="button" disabled={cartItems.length === 0}>
          proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartScreen;
