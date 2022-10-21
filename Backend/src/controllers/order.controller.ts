import { Request, Response, NextFunction } from "express";
import Order from "../models/order.model";

export class OrderController {
  GetOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      Order.find({})
        .populate("client")
        .populate("orderItems.product")
        .exec((orders) => {
          res.json({
            status: "success",
            data: { orders },
          });
        });
    } catch (err) {
      next(err);
    }
  };

  GetOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await Order.find({ _id: req.params.id as string });
      res.json({
        status: "success",
        data: { order },
      });
    } catch (err) {
      next(err);
    }
  };
  CreateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await Order.insertMany(req.body);
      res.json({
        status: "success",
        data: { order },
      });
    } catch (err) {
      next(err);
    }
  };
  DeleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await Order.deleteOne({ _id: req.params.id as string });
      if (order.deletedCount > 0) {
        res.json({
          status: "success",
          message: "order deleted successfully",
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "order not found",
        });
      }
    } catch (err) {
      next(err);
    }
  };
  UpdateOrderStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const order = await Order.findByIdAndUpdate(id, req.body.status).then(
        (data) => {
          if (!data) {
            res.status(404).send({ message: "order not found" });
          } else {
            res.status(200).send({ message: "order updated" });
          }
        }
      );
    } catch (err) {
      next(err);
    }
  };
}
