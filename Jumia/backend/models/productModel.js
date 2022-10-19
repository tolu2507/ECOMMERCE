import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categories: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  brand: { type: String, required: true },
  rating: { type: Number, default: 0, required: false },
  numReviews: { type: Number, default: 0, required: false },
  inStock: { type: Number, default: 0, required: true },
  description: { type: String, required: true },
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
