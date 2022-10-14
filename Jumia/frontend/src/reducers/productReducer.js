import { PRODUCT_DETAILED_FAIL, PRODUCT_DETAILED_REQUEST, PRODUCT_DETAILED_SUCCESSFUL, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESSFUL } from "../constant/productConstant";

const productListReducer = (state = [], action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESSFUL:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
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

export { productListReducer, productDetailsReducer };
