import express from "express";
import Product from "../models/productModel.js";
import { isAdmin, isAuth } from "../util.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const product = await Product.find({});
    res.send(product);
  } catch (error) {
    res.status(401).send({ msg: "No products found" });
  }
});

router.get("/:id", async (req, res) => {
  try {
      const product = await Product.findOne({ _id: req.params.id });
      if (product) {
        res.send(product);  
      } else {
        res.status(401).send({ msg: "No products found" });
      }
    
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

router.post("/", isAuth, isAdmin, async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      categories: req.body.categories,
      image: req.body.image,
      price: req.body.price,
      brand: req.body.brand,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      inStock: req.body.inStock,
      description: req.body.description,
    });
    const newProduct = await product.save();

    if (newProduct) {
      return res.status(201).send({
        msg: "product created",
        data: newProduct,
      });
    }
    return res.status(500).send({ msg: "product not found" });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.categories = req.body.categories;
    product.image = req.body.image;
    product.price = req.body.price;
    product.brand = req.body.brand;
    product.rating = req.body.rating;
    product.numReviews = req.body.numReviews;
    product.inStock = req.body.inStock;
    product.description = req.body.description;

    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res.status(200).send({
        msg: "Product Updated",
        data: updatedProduct,
      });
    }
  }
  return res.status(500).send({ msg: "Error in Updating Product" });
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
        await deletedProduct.remove();
        res.send({ msg: "Product Deleted Successfully" });
    } else {
        res.send({msg: "Error in Deleting Product."})
    }
})

export default router;
