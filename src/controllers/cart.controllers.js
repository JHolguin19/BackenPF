import Controllers from "./class.controller.js";
import CartServices from '../services/cart.services.js';
import { HttpResponse } from "../utils/http.response.js";
import errorDictionary from "../utils/error.dictionary.js";
import mongoose from "mongoose";
const httpResponse = new HttpResponse();
const cartService = new CartServices();

export default class CartController extends Controllers{
  constructor(){
    super(cartService)
  }
  addProdToCart = async (req, res, next) => {
    try {
      const { cart } = req.user;
      const { idProd } = req.params;
      console.log('id carrito:' + cart)
      console.log('id prod:' + idProd)
  
      const newProdToUserCart = await this.service.addProdToCart(
        cart,
        idProd,
      );
      if (!newProdToUserCart) return httpResponse.NotFound(res, errorDictionary.ERROR_ADD_PROD_CART);
      else return httpResponse.Ok(res, newProdToUserCart);
    } catch (error) {
      next(error);
    }
  };

  removeProdToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const delProdToUserCart = await this.service.removeProdToCart(
        idCart,
        idProd,
      );
      if (!delProdToUserCart) return httpResponse.NotFound(res, errorDictionary.ERROR_TO_REMOVE_PROD);
      else httpResponse.Ok(res, {msg: `product ${idProd} deleted to cart`});
    } catch (error) {
      next(error);
    }
  };

  updateProdQuantityToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const { quantity } = req.body;
      const  updateProdQuantity = await this.service.updateProdQuantityToCart(
        idCart,
        idProd,
        quantity
      );
      if (!updateProdQuantity) return httpResponse.NotFound(res, errorDictionary.ERROR_UPDATE_QUANTITY_PROD);
      else return httpResponse.Ok(res, updateProdQuantity);
    } catch (error) {
      next(error);
    }
  };

  clearCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const clearCart = await this.service.clearCart(
        idCart,
      );
      if (!clearCart) return httpResponse.NotFound(res, errorDictionary.ERROR_TO_CLEAN_CART);
      else return httpResponse.Ok(res, clearCart);
    } catch (error) {
      next(error);
    }
  };

}





  
  