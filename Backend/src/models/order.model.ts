import mongoose,{Schema} from "mongoose"; 

const OderSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:[true,"user id must be required"]
    },
    Products:[{
        type:Schema.Types.ObjectId,
        ref:'Product'
    }],
    status:{
        type:String,
        enum:['Accepted','Rejected','Pending']
    }

    
});


const Order = mongoose.model("Order",OderSchema);

export default Order;