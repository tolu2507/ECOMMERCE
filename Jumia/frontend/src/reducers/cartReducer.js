import { ADD_TO_CART } from "../constant/cartConstants";

function cartReducer(state = { cartItems: [] }, action) {
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
          return {cartItems: [...state.cartItems, items]}
    default:
      return state
  }
}
export {cartReducer}
