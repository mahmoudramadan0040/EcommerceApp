import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import dbConnection from './Database/index';
import config from "./config/config";
import ErrMiddleware from "./middlewares/err";
const PORT =config.port || 3000
// create an instance server
const app: Application = express()
dbConnection();
// HTTP request logger middleware
app.use(morgan('dev'))
app.use(express.json());
// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  })
})
// error handler middelware 
const err=  new ErrMiddleware();
app.use(err.error);
// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})
export default app