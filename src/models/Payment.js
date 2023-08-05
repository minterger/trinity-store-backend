import { Schema, model } from "mongoose";

const ItemSchema = new Schema({
  title: { type: String, required: true, unique: true },
  type: { type: String },
  img: { type: String, required: true },
  description: { type: String, required: true },
  unit_price: { type: Number, required: true },
  username: { type: String },
});

const paymentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "pending" },
  init_point: { type: String, required: true },
  items: [ItemSchema],
  external_reference: { type: String, required: true },
});

export default model("Payment", paymentSchema);
