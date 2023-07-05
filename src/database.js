import mongoose from "mongoose";

const Database = process.env.DATABASE;
(async () => {
  try {
    await mongoose.connect(Database);
    console.log("database is connected");
  } catch (error) {
    console.error(error);
  }
})();
