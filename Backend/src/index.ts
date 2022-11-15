import express, { Application, Request, Response } from 'express'
import swaggerUi from "swagger-ui-express";
import morgan from 'morgan'
import dbConnection from './Database/index';
import config from "./config/config";
import ErrMiddleware from "./middlewares/err";
import routes from '../src/routes/index';
import Yaml from 'yamljs';
import cors from 'cors';
import bodyparser from 'body-parser'

const PORT =config.port || 3000
// create an instance server
const app: Application = express()
dbConnection();
// HTTP request logger middleware
app.use(morgan('common'))
app.use(express.json());

// yamljs convert Yaml file to Json file 
const swaggerDocument = Yaml.load('swagger.yaml');
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');   
 
//   next();
// });
app.use(cors());
// {
//   methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
//   'Access-Control-Allow-Origin':'*'
// })
app.use('/api',routes);
app.use(express.static("public"));
// error handler middelware 
const err=  new ErrMiddleware();
app.use(err.error);
// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})
export default app