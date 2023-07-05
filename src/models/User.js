import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import md5 from "md5";
import axios from "axios";

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  uuid: { type: String },
  avatar: { type: String },
  admin: { type: Boolean, default: false },
  password: { type: String, required: true },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  try {
    const salt = await bcrypt.genSalt(10);

    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, salt);
    }
    const { statusText, data } = await axios.get(
      `https://playerdb.co/api/player/minecraft/${user.username}`
    );

    if (statusText === "OK") {
      user.uuid = data.data.player.raw_id;
    }

    user.avatar = md5(user.email);

    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.checkPassword = async function (password) {
  const user = this;
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
};

export default model("User", UserSchema);
