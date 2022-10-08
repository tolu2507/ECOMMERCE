import React from 'react';
import { Link } from 'react-router-dom';
import data from '../data' 

function HomeScreen(props) {
    return (
      <ul className="products">
        {data.products.map((products) => (
          <li key={products._id}>
            <div className="product">
              <Link to={'/products/' + products._id}>
                <img src={products.image} alt="product" />
              </Link>
              <div className="product-name">
                <Link to={'/products/' + products._id}>{products.name}</Link>
              </div>
              <div className="product-brand">{products.brand}</div>
              <div className="product-price">${products.price}</div>
              <div className="product-rating">
                {products.rating}stars({products.numReviews}reviews)
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
}
export default HomeScreen