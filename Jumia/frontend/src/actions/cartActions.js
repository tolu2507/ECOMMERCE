import Axios from "axios"
import { ADD_TO_CART } from "../constant/cartConstants";

const addToCart = (id, qty) => async (dispatch) => {
    
    try {
        const { data } = await Axios.get("/api/products/" + id);
        dispatch({
            type: ADD_TO_CART, payload: {
                product: data._id,
                name: data.name,
                price: data.price,
                image: data.image,
                inStock: data.inStock,
                qty
        }})
    } catch (error) {
    }
}
export { addToCart };