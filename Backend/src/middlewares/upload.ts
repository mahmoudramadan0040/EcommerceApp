import util from 'util';
import multer from 'multer';

const maxSize =2*1024*1024
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"src/resources/images/products");
    },
    filename:(res,file,callback)=>{
        callback(null, file.originalname);
    }
})
 let uploadFile =multer({
     storage:storage,
     limits:{fileSize:maxSize}
 }).array('images',10);

 const uploadFileMiddleware = util.promisify(uploadFile);

 export default uploadFileMiddleware;