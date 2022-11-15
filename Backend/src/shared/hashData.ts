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
            const userExist = await User.findOne({"email":email});
            if(userExist){
                console.log(userExist);
                const checkPassword =  bcrypt.compareSync(`${password}${config.pepper}`,userExist?.password as string );
                console.log(checkPassword)
                if(checkPassword){
                    return userExist as IUser;
                }
                return null;
            }
            return null ;
            
        }catch(error){
            throw new Error("user can not be autherized");
        }
    }
}
export default Hash;