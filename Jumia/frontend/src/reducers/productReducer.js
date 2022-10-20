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

const productListReducer = (state = [], action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESSFUL:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, products: action.payload };
    default:
      return state;
  }
};

const productSaveReducer = (state = [], action) => {
  switch (action.type) {
    case PRODUCT_SAVE_REQUEST:
      return { loading: true };
    case PRODUCT_SAVE_SUCCESSFUL:
      return { loading: false, success: true, products: action.payload };
    case PRODUCT_SAVE_FAIL:
      return { loading: false, products: action.payload };
    default:
      return state;
  }
};

const productDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DETAILED_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILED_SUCCESSFUL:
      return { loading: false, products: action.payload };
    case PRODUCT_DETAILED_FAIL:
      return { loading: false, products: action.payload };
    default:
      return state;
  }
};

const productDeleteReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESSFUL:
      return { loading: false, products: action.payload, sucess: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, products: action.payload };
    default:
      return state;
  }
};

export { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer };
