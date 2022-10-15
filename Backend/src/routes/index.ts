import { Router } from "express";
import UserRoute from "./api/user.route";
import ProductRoutes from "./api/product.route";
import OrderRoutes from "./api/order.route";
const routes = Router();
routes.use("/user", UserRoute);
routes.use("/product", ProductRoutes);
routes.use("/order", OrderRoutes);

export default routes;
