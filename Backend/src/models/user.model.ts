import mongoose,{Schema} from "mongoose"; 

const UserSchema = new Schema({
    name:String,
    email: String,
    firstname:String,
    lastname:String,
    username:String,
    password:String,
});

const User = mongoose.model("User",UserSchema);

export default User;