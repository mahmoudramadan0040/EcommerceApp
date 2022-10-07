import Product from "../models/product2.model";
import { Request, Response, NextFunction } from "express";

export class ProductController {
  CreateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await Product.insertMany(req.body);
      console.log(product);
      res.json({
        status: "sucess",
        data: { product },
      });
    } catch (err) {
      console.log(err);
    }
  };

  GetProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await Product.find({ _id: req.params.id as string });
      res.json({
        status: "sucess",
        data: { product },
      });
    } catch (err) {
      next(err);
      console.log(err);
    }
  };

  GetProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await Product.find({});
      res.json({
        status: "sucess",
        data: { product },
      });
    } catch (err) {
      next(err);
    }
  };
  UpdateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body) {
        res.status(400).send({ message: "data can't be empty" });
      }
      const id = req.params.id;
      const product = await Product.findByIdAndUpdate(id, req.body).then(
        (data) => {
          if (!data) {
            res.status(404).send({ message: "product not found" });
          } else {
            {
              res.status(200).send({ message: "product updated successfully" });
            }
          }
        }
      );
    } catch (err) {
      next(err);
    }
  };

  DeleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await Product.deleteOne({ _id: req.params.id as string });
      if (product.deletedCount > 0) {
        res.json({
          status: "sucess",
          message: "product deleted successfully",
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "product not found",
        });
      }
    } catch (err) {
      next(err);
    }
  };
}
