import "dotenv/config";
import app from "./app.js";

const port = process.env.PORT || 4000;

app.listen("4000", () => {
  console.log("Listening on port", port);
});
