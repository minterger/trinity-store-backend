import { Router } from "express";
import {
  createRank,
  deleteRank,
  editRank,
  getRanks,
} from "../controllers/rank.controllers.js";

const route = Router();

route.get("/", getRanks);

route.post("/create", createRank);

route.put("/edit/:id", editRank);

route.delete("/delete/:id", deleteRank);

export default route;
