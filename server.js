require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const ACTOR_API_VERSION = process.env.ACTOR_API_VERSION || "v1";

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

var corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const actingCreditsRoutes = require("./routes/acting-credits");
const eventRoutes = require("./routes/events");

app.use(`/api/${ACTOR_API_VERSION}/acting-credits`, actingCreditsRoutes);

app.use(`/api/${ACTOR_API_VERSION}/events`, eventRoutes);

app.listen(PORT, () => {
  console.log("hello app");
});
