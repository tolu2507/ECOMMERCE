import { ADD_TO_CART, PAYMENT_FROM_CART, REMOVE_FROM_CART, SAVE_TO_CART } from "../constant/cartConstants";

function cartReducer(state = { cartItems: [], shipping: {}, payment: {} }, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const items = action.payload;
      const products = state.cartItems.find((x) => x.product === items.product);

      if (products) {
        return {
          cartItems: state.cartItems.map((x) =>
            products.product === x.product ? items : x
          ),
        };
      }
      return { cartItems: [...state.cartItems, items] };
    case REMOVE_FROM_CART:
      return {
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case SAVE_TO_CART:
      return { ...state, shipping: action.payload };
    case PAYMENT_FROM_CART:
      return { ...state, payment: action.payload };
    default:
      return state;
  }
}
export { cartReducer };
