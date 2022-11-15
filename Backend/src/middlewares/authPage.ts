import { Request, Response, NextFunction } from 'express';

const authPage =(premission:any) =>{
    return (req:Request,res:Response,next:NextFunction) =>{
        const userRole =req.body.role;
        if(premission.includes(userRole)){
            next()
        }else{
            return res.status(401).json("access denied !")
        }
    }
}
export default authPage;