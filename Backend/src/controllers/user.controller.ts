import {Request , Response,NextFunction} from 'express';
import config from '../config/config';
import Jwt from 'jsonwebtoken'
import User from '../models/user.model';
import Hash from '../shared/hashData';
import Joi from 'joi';



export class UserController {
    private hash:any;

    constructor(){
        this.hash = new Hash();
    }
    GetUsers = async(req:Request,res:Response,next:NextFunction)=>{
        try{
            let users = await User.find({});
            res.json({
                status:"sucess",
                data:{users},
                "message":"users shows successfully"
            })
        }catch(err){
            next(err)
        }
    }
    GetUser = async (req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.params.id);
            let user = await User.find({_id:req.params.id as string} );
            res.json({
                status:"sucess",
                data:{user},
                "message":"user shows successfully"
            })
        }catch(err){
            next(err)
        }
    }
    UpdateUser =async (req:Request,res:Response,next:NextFunction)=>{
        try{
            if(!req.body){
                res.status(400).send({
                    message:"data to update can not be empty!"
                });
            }
            let id:string = req.params.id;

            await User.findByIdAndUpdate(id,req.body,{ useFindAndModify: false } )
            .then(data =>{
                if(!data){
                    res.status(404).send({
                        message:"User Not Found"
                    });
                }
                else{
                    res.status(200).send({message : "User updated successfully"})
                }
            });
        }catch(err){
            next(err)
        }
    }
    DeleteUser = async (req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.params.id);
            let result = await User.deleteOne({_id:req.params.id as string} );
            console.log(result);
            if(result.deletedCount !==0 ){
                res.json({
                    status:"sucess",
                    "message":"user deleted successfully"
                })
            }
            else{
                res.status(404).json({
                    status:"error",
                    "message":"user not found to delete"
                })
            }
        }catch(err){
            next(err)
        }
    }
    Register = async  (req:Request, res: Response,next:NextFunction) => {
        try{
            // validate request 
            const schema = Joi.object({
                firstname:Joi.string().min(3).max(40),
                lastname:Joi.string().min(3).max(40),
                username:Joi.string().min(3).max(40).required(),
                email:Joi.string().email().required(),
                password:Joi.string().min(6).required(),
                imageUrl:Joi.string()
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
                
            }
            else{
                // check if the email is unique or not 
                const checkEmail =  await User.find({email:req.body.email});
                
                if(checkEmail){
                   res.status(400).json({
                       status:"error",
                       "message":"Email shoud be unique value !"
                   })
                   return;
                } 
                // hash the password value 
                req.body.password = await this.hash.hashPassword(req.body.password as string )
                // create user   
                const user = new User({...req.body});
                user.save((err)=>{
                    next(err);
                });
                res.json({
                    status:"sucess",
                    data:{user},
                    "message":"user created successfully ! "
                })
               
            }
        }catch(err){
            console.log(err)
            next(err)
        }

    }
    
    Login = async  ( req:Request, res: Response,next:NextFunction)=>{
        try{ 
            console.log(req.body);
            const schema = Joi.object({
                email:Joi.string().email().required(),
                password:Joi.string().min(6).required(),
            })
            const options = {
                abortEarly: false, // include all errors
            };
            const { error } = schema.validate(req.body,options);
            if(error){
                next(error.details.map(x => {
                    return {label:x.context?.label,message:x.message.toString().replaceAll(`"`,'')}
                }))
            }
            else{
                const {email,password}= req.body;
                const user_auth = await this.hash.auth(email,password);
                console.log(user_auth);
                const token =Jwt.sign({user_auth},config.token as string );
                if(user_auth){
                    return res.json({ 
                        status:"success",
                        data:{user_auth,token}
                    })
                }else{
                    return res.status(401).json({
                        status:"error faild login",
                        message:"the user and password incorrect please try again "
                    })
                }
            }
            
        }catch(err){
            return next(err);
        }
    }
}
export default UserController;