import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const productCollectionName = "products";

export const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  owner: {type: String, default:'admin'},
  premium: {type: String, default:'admin'}
});

productSchema.plugin(mongoosePaginate);

export const ProductModel = model(productCollectionName, productSchema);
