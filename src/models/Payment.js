import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "pending" },
  delivery_items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  init_point: { type: String, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  external_reference: { type: String, required: true },
});

export default model("Payment", paymentSchema);
