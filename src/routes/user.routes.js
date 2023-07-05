import { Router } from "express";
import {
  createUser,
  loginUser,
  getUser,
} from "../controllers/user.controllers.js";
import { checkUser } from "../middlewares/checkUser.js";

const route = Router();

route.post("/create", createUser);

route.post("/login", loginUser);

route.get("/", checkUser, getUser);

export default route;
