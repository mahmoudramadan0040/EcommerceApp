import { Router } from "express";
import UserRoute from "./api/user.route";
import ProductRoutes from "./api/product.route";
const routes = Router();
routes.use("/user", UserRoute);
routes.use("/product", ProductRoutes);

export default routes;
