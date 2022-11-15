import Product from "../models/product.model";
import { Request, Response, NextFunction } from "express";
import uploadFile from '../middlewares/upload';
import Joi from 'joi';
import config from '../config/config';
import path from "path";
import fs from 'fs';
export class ProductController {
  CreateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // this is middelware 
      console.log(req);

      await uploadFile(req,res);
      console.log(req.files);
      if (req.files == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
      
       // validate request 
       const schema = Joi.object({
        title:Joi.string().max(200).required(),
        price:Joi.number().required(),
        details:Joi.string(),
        category:Joi.string(),
        ProdQuantity:Joi.number().required(),
        imageUrl:Joi.array().items(Joi.string())
      })
      const options = {
        abortEarly: false, // include all errors
      };
      const { error } = schema.validate(req.body,options);
      if(error){
        console.log(error.details)
        next(error.details.map(x => {
            return {label:x.context?.label,message:x.message.toString().replaceAll(`"`,'')}
        }))
      }else{
        console.log(req.body);
        const imageURL = `http://localhost:${config.port}/api/product/images/`;

        req.body.imageUrl = (req as any).files.map((file:any) =>{
          return imageURL+file.originalname;
        })
        const product = await Product.insertMany(req.body);
        console.log(product);
        res.json({
          status: "sucess",
          data: { product },
        });
      }
      
    } catch (err) {
      console.log(err);
      next(err);
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
  GetProducts =async(req:Request,res:Response,next:NextFunction)=>{
    try {
      const product = await Product.find({});
      res.json({
        status: "sucess",
        data: { product },
      });
    } catch (err) {
      next(err);
    }
  }
  // this get product lazy load for 12 product in every page 
  GetProductsLazy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let pageNumber:number = parseInt( req.params.page);
      const product = await Product.find({}).limit(12).skip(pageNumber * 12);
      res.json({
        status: "sucess",
        data: { product },
      });
    } catch (err) {
      next(err);
    }
  };
  // search for product using name of title 
  GetProductUsingSearch = async (req:Request,res:Response,next:NextFunction) =>{
    try {
      console.log("hello world 222");
      console.log(req.query.ProductQuery);
      // console.log("hello world 222");

      let QueryName:string =req.query.ProductQuery as string ;
      const product = await Product.find({$text:{$search:QueryName,$diacriticSensitive:false}}).limit(12);
      res.json({
        status: "sucess",
        data: { product },
      });
    } catch (err) {
      next(err);
    }
  }

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

  getImage = async (req: Request, res: Response, next: NextFunction) =>{
    const fileName = req.params.name;
    const directoryPath  = "src/resources/images/products/";
    let contentType = 'text/html'
    let mimeType =path.extname(directoryPath+fileName);
    switch(mimeType){
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg': 
        contentType = 'image/jpg';
        break;
      case '.jpeg': 
        contentType = 'image/jpeg'; 
        break;
    }

    // read the target file and send to the client 
    fs.readFile(directoryPath+fileName,(err,data)=>{
      if(err) return;
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(data, 'utf8')
    })
    // res.download(directoryPath+fileName,fileName ,(err)=>{
    //   if(err){
    //     res.status(500).send({
    //       message:"could not download the file " + err
    //     });
    //   }
    // })
  }
}
