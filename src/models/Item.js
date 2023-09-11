import { Schema, model } from "mongoose";

const itemSchema = new Schema({
  title: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  img: { type: String, required: true },
  description: { type: String, required: true },
  command: { type: String, required: true },
  list: [{ type: String }],
  unit_price: { type: Number, required: true },
});

export default model("Item", itemSchema);
