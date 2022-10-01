import mongoose,{Schema} from "mongoose"; 

const UserSchema = new Schema({
    firstname:String,
    lastname:String,
    username:{
        type:String,
        required:[true,"username must be required"]
    },
    email: {
        type:String,
        required:[true,"email must be required"]
    },
    password:{
        type:String,
        required:[true,"password must be required"]
    },
    imageUrl:String
});

const User = mongoose.model("User",UserSchema);

export default User;