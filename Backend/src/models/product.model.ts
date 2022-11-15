import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
  imageUrl: [String],
  category:{
    type:String,
  },
  ProdQuantity:{
    type:Number,
  },

});
ProductSchema.index({title:'text'});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
