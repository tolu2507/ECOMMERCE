import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { addToCart } from "../actions/cartActions";

function CartScreen(props) {
    const { id } = useParams();
    const { search } = useLocation;
  const qty = search
    ? Number(search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
    return () => {
    //   
    };
  }, [dispatch, id, qty]);
    
  return (
    <div>
      <h3>CartScreen...........</h3>
    </div>
  );
}

export default CartScreen;
