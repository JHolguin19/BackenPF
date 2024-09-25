import { ProductModel } from '../persistence/daos/mongodb/models/product.model.js';
import {generateProduct} from '../utils/product.utils.js';

export const createProduct = async (cant = 50) => {
  try {
    const productArray = [];
    for (let i = 0; i < cant; i++) {
      const product = generateProduct();
      productArray.push(product);
    }
    return await ProductModel.create(productArray);
  } catch (error) {
    throw new Error(error);
  }
};

export const getProducts = async() => {
  try {
    return await ProductModel.find({})
  } catch (error) {
    throw new Error(error);
  }
};

