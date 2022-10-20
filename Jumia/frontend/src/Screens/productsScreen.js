import React, { useEffect, useState } from "react";
// import data from "../data";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, listProduct, saveProduct } from "../actions/actions.js";

function ProductsScreen(props) {
  const [id, setId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [inStock, setInStock] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [image, setImage] = useState("");
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave||successDelete) {
      setModalVisible(false);
    }
    dispatch(listProduct());
    return () => {
      //
    };
  }, [dispatch, successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setBrand(product.brand);
    setCategories(product.categories);
    setImage(product.image);
    setInStock(product.inStock)
    setDescription(product.description);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        brand,
        inStock,
        description,
        categories,
        image,
      })
    );
  };

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id))
  }

  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button" onClick={() => openModal({})}>
          Create Product
        </button>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <div className="form-sign">
                  {" "}
                  <h3>PRODUCTS</h3>
                </div>
              </li>
              <li>
                {loadingSave && (
                  <div>
                    <h2>Loading....</h2>
                  </div>
                )}
                {errorSave && (
                  <div>
                    <h2>{errorSave}</h2>
                  </div>
                )}
              </li>
              <li>
                <label htmlFor="name">
                  <h3>Name</h3>
                </label>
                <input
                  type="text"
                  name="name"
                  value={name || ""}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="price">
                  <h3>Price</h3>
                </label>
                <input
                  type="text"
                  name="price"
                  value={price || ""}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="brand">
                  <h3>Brand</h3>
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={brand || ""}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="image">
                  <h3>Image</h3>
                </label>
                <input
                  type="text"
                  name="image"
                  value={image || ""}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="categories">
                  <h3>Categories</h3>
                </label>
                <input
                  type="text"
                  name="categories"
                  value={categories || ""}
                  id="categories"
                  onChange={(e) => setCategories(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="inStock">
                  <h3>InStock</h3>
                </label>
                <input
                  type="text"
                  name="inStock"
                  value={inStock || ""}
                  id="inStock"
                  onChange={(e) => setInStock(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="description">
                  <h3>Description</h3>
                </label>
                <textarea
                  type="text"
                  name="description"
                  value={description || ""}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </li>
              <li>
                <button type="submit" className="button">
                  {id ? "UPDATE" : "CREATE"}
                </button>
              </li>
              <li>
                <button
                  className="button-fullwidth"
                  onClick={() => setModalVisible(false)}
                >
                  Close
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Categories</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.categories}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    className="button-fullwidth"
                    onClick={() => openModal(product)}
                  >
                    Edit
                  </button>
                  {' '}
                  <button
                    className="button-fullwidth"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ProductsScreen;
