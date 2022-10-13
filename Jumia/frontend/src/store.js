import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
import { productListReducer } from './reducers/productReducer';

const reducer = combineReducers({
    productList: productListReducer,
});

const composeEhn = window.__REDUX_DEVTOOL_EXTENSION_COMPOSE__ || compose
const initialState = {};

const store = createStore(reducer, initialState, composeEhn(applyMiddleware(thunk)));

export default store