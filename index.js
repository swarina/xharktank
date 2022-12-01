console.clear();
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

/** Middleware */
app.use(helmet());
app.use(cors());

app.use(express.json({ extended: false, limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

/** Connection to mongo db */
const port = process.env.SERVER_PORT || 8081;
const connectToDatabase = require("./config/dbConfig");
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`App is running on port : ${port}`);
  });
});

/** Routes */
app.use("/pitches", require("./router/pitch"));
app.use("/pitches", require("./router/offer"));

app.use("/", (_, res) => {
  res.status(200).json({
    message: "API Running",
  });
});