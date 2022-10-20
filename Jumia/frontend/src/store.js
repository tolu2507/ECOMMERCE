import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
import Cookies from 'js-cookie'
import { cartReducer } from './reducers/cartReducer';
import { productDeleteReducer, productDetailsReducer, productListReducer, productSaveReducer } from './reducers/productReducer';
import { userRegisterReducer, userSigninReducer } from './reducers/userReducers.js';

const cartItems = Cookies.getJSON("cartItems") || [];
const userInfo = Cookies.getJSON("userInfo") || null;

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer
});

const composeEhn = window.__REDUX_DEVTOOL_EXTENSION_COMPOSE__ || compose
const initialState = { cart: { cartItems, shipping:{}, paymentMethod: {} }, userSignin: { userInfo } };

const store = createStore(reducer, initialState, composeEhn(applyMiddleware(thunk)));

export default store