import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const checkUser = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.sendStatus(401);

  try {
    const user = jwt.verify(token, process.env.SECRET);

    req.user = await User.findById(user.id).select("-password -__v");

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
};

export const userIsAdmin = async (req, res, next) => {
  const user = req.user;

  if (!!user.admin) {
    next();
  } else {
    res.status(403).send("Necesitas ser administrador");
  }
};
