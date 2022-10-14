import React, { useEffect, useState } from "react";
// import data from "../data";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailedProduct } from "../actions/actions";

function ProductScreen(props) {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const dispatch = useDispatch();

  const { products, loading, error } = productDetails;

  useEffect(() => {
    dispatch(detailedProduct(id));
    return () => {
      //
    };
  }, [dispatch, id]);
  // const product = data.products.find((x) => x._id === id);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    navigate("/cart/" + id + "?qty=" + qty);
  };

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to Home Page</Link>
      </div>
      {loading ? (
        <div>
          <h3>Loading...</h3>
        </div>
      ) : error ? (
        <div>
          <h3>{error}</h3>
        </div>
      ) : (
        <div className="details">
          <div className="details-image">
            <img src={products?.image} alt="product" />
          </div>
          <div className="details-info">
            <ul>
              <li>
                <h4>{products?.name}</h4>
              </li>
              <li>
                {products?.rating} Stars ({products?.numReviews} Reviews)
              </li>
              <li>
                <strong>Price: ${products?.price}</strong>
              </li>
              <li>
                <em>Description: {products?.description}</em>
              </li>
            </ul>
          </div>
          <div className="details-action">
            <ul>
              <li>Price: ${products?.price}</li>
              <li>
                Status: {products?.inStock > 0 ? "In Stock" : "Unavailable"}
              </li>
              <li>
                Qty:{" "}
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(products?.inStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                {products?.inStock > 0 && (
                  <button onClick={handleAddToCart} className="button">
                    Add to Cart
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProductScreen;
