import { Router , Request,Response } from "express";
import UserController from '../../controllers/user.controller';
import authPage from "../../middlewares/authPage";
const routes =Router();
const User= new UserController();
// Create user 
routes.post('/register',User.Register);
// login user 
routes.post('/login',User.Login);
// get all users 
routes.get('/',authPage(['ADMIN']),User.GetUsers);
// get one user using id 
routes.get('/:id',authPage(['ADMIN']),User.GetUser);
// delete user using id 
routes.delete('/:id',authPage(['ADMIN']),User.DeleteUser);
// update user using id and data 
routes.put('/:id',authPage(['ADMIN','USER']),User.UpdateUser);
export default routes;