var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
let mongoose = require("mongoose");
let passport = require("passport");

var app = express();

let { usersRouter, ownersRouter, walkersRouter } = require("./routes");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .catch(e => console.log("db not connected", e));

// view engine setup
// app.set("view engine", "jade");

app.use(passport.initialize());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", usersRouter);
app.use("/api/owners", ownersRouter);
app.use("/api/walkers", walkersRouter);

module.exports = app;
