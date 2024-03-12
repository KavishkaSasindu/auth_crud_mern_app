const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userAuthRouter = require("./routes/UserAuthRoutes");

const app = express();

// middleware
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/auth_crud")
  .then((result) => {
    console.log("DB is connected");

    app.listen(3000, () => {
      console.log("server running");
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

//routes
app.use(userAuthRouter);
