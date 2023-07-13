import { Schema, model } from "mongoose";

const rankSchema = new Schema({
  title: { type: String, required: true, unique: true },
  img: { type: String, required: true },
  description: { type: String, required: true },
  list: [{ type: String }],
  unit_price: { type: Number, required: true },
});

export default model("Rank", rankSchema);
