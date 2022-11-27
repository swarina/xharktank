console.clear();
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

/** Middleware */
app.use(helmet());
app.use(cors());

/** Connection to mongo db */
const port = process.env.PORT || 8081;
const connectToDatabase = require("./config/dbConfig");
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`App is running on port : ${port}`);
  });
});