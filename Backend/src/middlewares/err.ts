import { Response,Request,NextFunction } from "express";
export interface Error {
    name?:string,
    stack?:string,
    message?:string,
    statusCode?:number,
}
class ErrMiddleware{
    error(err:Error,req:Request,res:Response,next:NextFunction){
        const status =err.statusCode ? err.statusCode:500;
        const message =err.message ? err.message : "something went wrong";
        res.status(status).json({
            status,
            message
        });
        
    }
}
export default ErrMiddleware;