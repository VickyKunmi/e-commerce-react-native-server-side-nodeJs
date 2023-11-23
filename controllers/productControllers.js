const Product = require("../models/Products");

module.exports = {
  createProduct: async (req, res) => {
    const newProduct = new Product(req.body);
    try {
      await newProduct.save();
      res.status(200).json("Product created successfully");
    } catch (error) {
      res.status(500).json("unable to create product");
    }
  },
  getAllProduct: async (req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json("unable to get products");
    }
  },
  getProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json("unable to get product");
    }
  },
  searchProduct: async (req, res) => {
    try {
      const result = await Product.aggregate([
        {
          $search: {
            index: "clothing",
            text: {
              query: req.params.key,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json("No result found");
    }
  },
  updateProduct: async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json("Product not found");
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json("Unable to update product");
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);

      if (!deletedProduct) {
        return res.status(404).json("Product not found");
      }

      res.status(200).json("Product deleted successfully");
    } catch (error) {
      res.status(500).json("Unable to delete product");
    }
  },
};
