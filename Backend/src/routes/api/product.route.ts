import { Router, Request, Response } from "express";
import { ProductController } from "./../../controllers/product.controller";
const ProductRoutes = Router();
const Product = new ProductController();

ProductRoutes.post("/", Product.CreateProduct);
ProductRoutes.get("/:id", Product.GetProduct);
ProductRoutes.get("/", Product.GetProducts);
ProductRoutes.put("/:id", Product.UpdateProduct);
ProductRoutes.delete("/:id", Product.DeleteProduct);
export default ProductRoutes;
