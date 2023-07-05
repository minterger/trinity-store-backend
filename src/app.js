import express from "express";
import morgan from "morgan";
import cors from "cors";

//database
import "./database.js";

//routes
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);

app.get("/", async (req, res) => {
  res.send("ok");
});

export default app;
