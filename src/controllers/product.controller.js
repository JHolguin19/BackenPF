import * as productService from "../services/product.service.js";

export const createProduct = async (req, res) => {
  try {
    const {cant} = req.query
    res.json(await productService.createProduct(cant))

  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async (req, res) => {
  try {
   res.json(productService.getProducts())
  } catch (error) {
    console.log(error);
  }
};


