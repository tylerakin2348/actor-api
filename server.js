require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
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
  useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", (error) => {
  console.error(error);
});

db.once("open", () => console.log("Connected to DataBase"));

var corsOptions = {
  origin: ["http://localhost:3001", "http://actor.tylerakin.com"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const actingCreditsRoutes = require("./routes/acting-credits");
const eventRoutes = require("./routes/events");
const userRoutes = require("./routes/users")
const liveChatRoutes = require("./routes/live-chat")

app.use(`/api/${ACTOR_API_VERSION}/acting-credits`, actingCreditsRoutes);

app.use(`/api/${ACTOR_API_VERSION}/events`, eventRoutes);

app.use(`/api/${ACTOR_API_VERSION}/users`, userRoutes);

app.use(`/api/${ACTOR_API_VERSION}/live-chat`, liveChatRoutes);

const authController = require("./auth/AuthController")
app.use(`/api/${ACTOR_API_VERSION}/auth`, authController);

app.listen(PORT, () => {
  console.log("hello app");
});

module.exports = app;
