import mongoose,{Schema} from "mongoose"; 

const ProductSchema = new Schema({
    ProdName:{
        type:String,
        required:[true,"product name must be required "]
    },
    ProdQuantity:{
        type:Number,
        required:[true,"product Quantity must be required"]
    },
    Description:{
        type:String,
    },
    Price:{
        type:Number,
        required:[true,"product price must be required"]
    },
    ProdImageUrl:[String]



    
});


const Product = mongoose.model("Product",ProductSchema);

export default Product;