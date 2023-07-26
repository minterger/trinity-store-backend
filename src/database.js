import mongoose from "mongoose";

import { Database } from "./config.js";

(async () => {
  try {
    await mongoose.connect(Database);
    console.log("database is connected");
  } catch (error) {
    console.error(error);
  }
})();
