import axios from "axios";
import {
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESSFUL,
  PRODUCT_DETAILED_FAIL,
  PRODUCT_DETAILED_REQUEST,
  PRODUCT_DETAILED_SUCCESSFUL,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESSFUL,
  PRODUCT_SAVE_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESSFUL,
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

const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!product._id) {
      const { data } = await axios.post("/api/products", product, {
        headers: { Authorization: "Bearer " + userInfo.token },
      });
      dispatch({ type: PRODUCT_SAVE_SUCCESSFUL, payload: data });
    } else {
      const { data } = await axios.put(
        "/api/products/" + product._id,
        product,
        {
          headers: { Authorization: "Bearer " + userInfo.token },
        }
      );
      dispatch({ type: PRODUCT_SAVE_SUCCESSFUL, payload: data });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};
const detailedProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILED_REQUEST, payload: productId });
    const { data } = await axios.get("/api/products/" + productId);
    dispatch({ type: PRODUCT_DETAILED_SUCCESSFUL, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILED_FAIL, payload: error.message });
  }
};

const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const { data } = await axios.delete("/api/products/" + productId, {
      headers: { Authorization: "Bearer " + userInfo.token },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESSFUL, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

export { listProduct, detailedProduct, saveProduct, deleteProduct };
