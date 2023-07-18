import express from "express";
import morgan from "morgan";
import cors from "cors";

//database
import "./database.js";

// import routes
import userRoutes from "./routes/user.routes.js";
import rankRoutes from "./routes/rank.routes.js";

const app = express();

const dev = process.env.MODE === "dev";

app.use(
  cors({
    origin: dev
      ? "*"
      : ["https://www.trinitymc.online", "https://trinitymc.online"],
  })
);
app.use(morgan(dev ? "dev" : "tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/user", userRoutes);
app.use("/rank", rankRoutes);

app.get("/", async (req, res) => {
  res.send("ok");
});

export default app;
