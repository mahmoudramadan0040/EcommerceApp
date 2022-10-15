import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  total: {
    type: Number,
    default: 0,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    required: true,
    default: "pending",
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      qty: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
