import { Router, Request, Response } from "express";
import { OrderController } from "../../controllers/order.controller";
const OrderRoutes = Router();
const Order = new OrderController();
OrderRoutes.post("/", Order.CreateOrder);
OrderRoutes.get("/", Order.GetOrders);
OrderRoutes.get("/:id", Order.GetOrder);
OrderRoutes.put("/:id", Order.UpdateOrderStatus);
OrderRoutes.delete("/:id", Order.DeleteOrder);

export default OrderRoutes;
