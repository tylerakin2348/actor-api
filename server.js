require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

function determineDatabaseURL() {
  if (process.env.ENVIRONMENT === "production") {
    return process.env.DATABASE_URL_PROD;
  }
  return process.env.DATABASE_URL_DEV;
}

const properDatabaseURL = determineDatabaseURL();

mongoose.connect(properDatabaseURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => {
  console.error(error);
});

db.once("open", () => console.log("Connected to DataBase"));

app.use(express.json());

const actingCreditsRoutes = require("./routes/acting-credits");

app.use("/api/v1/acting-credits", actingCreditsRoutes);

app.listen(3000, () => {
  console.log("hello app");
});
