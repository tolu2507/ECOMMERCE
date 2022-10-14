import axios from "axios";
import {
  PRODUCT_DETAILED_FAIL,
  PRODUCT_DETAILED_REQUEST,
  PRODUCT_DETAILED_SUCCESSFUL,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESSFUL,
} from "../constant/productConstant";

const listProduct = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESSFUL, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const detailedProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILED_REQUEST, payload: productId });
    const { data } = await axios.get("/api/products/" + productId);
    dispatch({ type: PRODUCT_DETAILED_SUCCESSFUL, payload: data });
  } catch (error) {
    dispatch({type: PRODUCT_DETAILED_FAIL, payload: error.message})
  }
}

export { listProduct , detailedProduct};
