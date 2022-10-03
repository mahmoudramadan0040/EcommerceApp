import bcrypt from 'bcrypt';
import config from '../config/config';
import IUser from '../interfaces/user.interface';
import User from '../models/user.model';
class Hash {
    public async hashPassword(password:string):Promise<string>{
        console.log("hellow owle");
        const salt = parseInt(config.salt as string );
        console.log(salt);
        const hashSercret = bcrypt.hash(`${password}${config.pepper}`,salt);
        return hashSercret;
    }
    public async auth (email:string,password:string):Promise<IUser|null>{
        try{
            const result = await User.findOne({"email":email});
            console.log(result);
            const checkPassword =  bcrypt.compareSync(`${password}${config.pepper}`,result?.password as string );
            if(checkPassword){
                return result as IUser;
            }
            return null;
        }catch(error){
            throw new Error("user can not be autherized");
        }
    }
}
export default Hash;