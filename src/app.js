import express from "express";
import morgan from "morgan";
import cors from "cors";
import { Dev } from "./config.js";

//database
import "./database.js";

// import routes
import userRoutes from "./routes/user.routes.js";
import rankRoutes from "./routes/rank.routes.js";
import mpRoutes from "./routes/mp.routes.js";

const app = express();

app.use(
  cors({
    origin: Dev
      ? "*"
      : ["https://www.trinitymc.online", "https://trinitymc.online", "https://trinity-store-backend.vercel.app"],
  })
);
app.use(morgan(Dev ? "dev" : "tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/user", userRoutes);
app.use("/rank", rankRoutes);
app.use("/mp", mpRoutes);

app.get("/", (req, res) => {
  res.send("ok");
});

app.get("/*", (req, res) => {
  res.status(400).send("route not found");
});

export default app;
