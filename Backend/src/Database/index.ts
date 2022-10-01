// here is connect to mongo database
import mongoose from 'mongoose';
import config from '../config/config';
const dbConnection = async()=>{
    console.log(config.db_url);
    mongoose.connect((config.db_url as string+ '/' + config.db_name as string  ) as string ).then(()=>
    {
        console.log("connected");
    }).catch(err =>{
        console.log(err.message);
    })
}
export default dbConnection;