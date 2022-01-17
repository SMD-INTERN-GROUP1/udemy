const createError = require("http-errors");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const paypal = require("paypal-rest-sdk");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
dotenv.config();

const route = require("./routes/index");

// db
mongoose.connect(process.env.MONGO_DB, function (err) {
  if (!err) {
    console.log("connected sucessfully");
  } else {
    console.log("error");
  }
});

//payment

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AUzspjS4ov0cME-ngsMUMXUjnRrREzgIq6v08q5SxXBLhgdqkWzCi7-TOEzt4h4otyEJeEnm5Mtbd99o",
  client_secret:
    "ECSOuh2RfNBwD-vSzKsDDRw5ZU4Bf8W-PAftU3VqaUDVkkXB3VSKlj6y1_-iYTiNxOv-5N_24MEkVMS0",
});

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// override using a query value
app.use(methodOverride("_method"));

route(app);

// catch 404 and forward to error handler
/* app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
}); */

module.exports = app;
