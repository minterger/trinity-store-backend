import "dotenv/config";
import app from "./app.js";
import { Port } from "./config.js";

app.listen("4000", () => {
  console.log("Listening on port", Port);
});
