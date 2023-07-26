import { Router } from "express";
import { createPreference, webhook } from "../controllers/mp.controllers.js";

const route = Router();

route.post("/create-preference", createPreference);

route.post("/validate-pay");

route.post("/webhook", webhook);

export default route;
