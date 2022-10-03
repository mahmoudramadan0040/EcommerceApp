import { Router , Request,Response } from "express";
import UserController from '../../controllers/user.controller';
const routes =Router();
const User= new UserController();
// Create user 
routes.post('/register',User.Register);
// login user 
routes.post('/login',User.Login);
// get all users 
routes.get('/',User.GetUsers);
// get one user using id 
routes.get('/:id',User.GetUser);
// delete user using id 
routes.delete('/:id',User.DeleteUser);
// update user using id and data 
routes.put('/:id',User.UpdateUser);
export default routes;