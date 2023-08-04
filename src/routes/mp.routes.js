import { Router } from "express";
import { createPreference, webhook } from "../controllers/mp.controllers.js";
import { checkUser } from "../middlewares/checkUser.js";

const route = Router();

route.post("/create-preference", checkUser, createPreference);

route.post("/validate-pay");

route.post("/webhook", webhook);

export default route;
