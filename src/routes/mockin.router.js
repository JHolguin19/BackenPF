import * as productController from "../controllers/product.controller.js";
import { Router } from "express";
const router = Router();

router.post('/create', productController.createProduct);
router.get('/', productController.getProducts)

export default router;
