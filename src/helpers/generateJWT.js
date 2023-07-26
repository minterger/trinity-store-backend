import jwt from "jsonwebtoken";
import { Secret } from "../config.js";

const generateJWT = (user) => {
  const { id, admin, username, email, uuid } = user;

  return jwt.sign({ id, admin, username, email, uuid }, Secret, {
    expiresIn: "2d",
  });
};

export default generateJWT;
