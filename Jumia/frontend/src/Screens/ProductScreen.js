import React from "react";
import data from "../data";
import { useParams, Link } from "react-router-dom";

function ProductScreen(props) {
  const { id } = useParams();
  const product = data.products.find((x) => x._id === id);

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to Home Page</Link>
      </div>
      <div className="details">
        <div className="details-image">
          <img src={product.image} alt="product" />
        </div>
        <div className="details-info">
          <ul>
            <li>
              <h4>{product.name}</h4>
            </li>
            <li>
              {product.rating} Stars ({product.rating} Reviews)
            </li>
            <li>
              Price:<strong>${product.price}</strong>
            </li>
            <li>
              <em>Description: {product.description}</em>
            </li>
          </ul>
        </div>
        <div className="details-action">
          <ul>
            <li>Price: ${product.price}</li>
            <li>Status: {product.status}</li>
            <li>
              Qty:{" "}
              <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </li>
            <li>
              <button className="button">Add to Cart</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default ProductScreen;
