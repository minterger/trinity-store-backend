import { Router } from "express";
import {
  createRank,
  deleteRank,
  editRank,
  getRanks,
} from "../controllers/rank.controllers.js";
import { checkUser, userIsAdmin } from "../middlewares/checkUser.js";

const route = Router();

route.get("/", getRanks);

route.post("/create", [checkUser, userIsAdmin], createRank);

route.put("/edit/:id", [checkUser, userIsAdmin], editRank);

route.delete("/delete/:id", [checkUser, userIsAdmin], deleteRank);

export default route;
