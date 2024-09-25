import Controllers from "./class.controller.js";
import ProductService from "../services/product.services.js";
import { HttpResponse } from "../utils/http.response.js";
import errorDictionary from "../utils/error.dictionary.js";
const prodService = new ProductService();

const httpResponse= new HttpResponse()
export default class ProductController extends Controllers {
    constructor(){
        super(prodService);
        this.product=prodService
    }

    create = async(req, res, next) =>{
        try {
            const productData = req.body;
            const user = req.user; 
            const data = await this.product.createProduct(productData, user)
            if(!data) return httpResponse.NotFound(res, {msg: 'not Product to create'})
            else return httpResponse.Ok(res, data)
        } catch (error) {
            next(error)
        }
    }

    deleteProduct = async(req, res, next)=>{
        try {
            const { id } = req.params;
            const data = await this.product.removeProduct(id);
            if(!data) return httpResponse.NotFound(res, errorDictionary.ERROR_TO_DELETE)
              else return httpResponse.Ok(res, data);
          } catch (error) {
            next(error);
          }
        };
    }
    
