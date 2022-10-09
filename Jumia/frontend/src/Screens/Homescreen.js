import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

function HomeScreen(props) {
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listProducts())
    // const fetchData = async () => {
    //   const { data } = await axios.get("/api/products");
    //   setProducts(data);
    // }
    // fetchData()
    return () => {
      //
    };
  }, [dispatch]);

  return (
    loading ? <div><h3>Loading...</h3></div> : error ? <div><h3>{error}</h3></div> :
    <ul className="products">
      {products.map((product) => (
        <li key={product._id}>
          <div className="product">
            <Link to={"/products/" + product._id}>
              <img src={product.image} alt="product" />
            </Link>
            <div className="product-name">
              <Link to={"/products/" + product._id}>{product.name}</Link>
            </div>
            <div className="product-brand">{product.brand}</div>
            <div className="product-price">${product.price}</div>
            <div className="product-rating">
              {product.rating}stars({product.numReviews}reviews)
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
export default HomeScreen;
