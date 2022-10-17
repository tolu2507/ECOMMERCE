import Axios from "axios";
import Cookies from "js-cookie";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../constant/cartConstants";

const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get("/api/products/" + id);
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data._id,
        name: data.name,
        price: data.price,
        image: data.image,
        inStock: data.inStock,
        qty,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookies.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {}
};
const removeFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: id,
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookies.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {}
};
export { addToCart, removeFromCart };
