import {Router} from 'express';
import UserRoute from './api/user.route';

const routes =Router();
routes.use('/user',UserRoute);

export default routes;


