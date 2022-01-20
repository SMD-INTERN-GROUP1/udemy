const createError = require("http-errors");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const paypal = require('paypal-rest-sdk');
const session = require('express-session');
const methodOverride = require('method-override')
const mongoose = require("mongoose");


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

//sesstion

// app.set('trust proxy', 1) 
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))

//payment

paypal.configure({

  'mode': 'sandbox', //sandbox or live
  'client_id': 'AStfnCB1MGhO7ngndwNoy6nywUsoZkbyrRJzuJ-zH7HonwXM5MMwcembTy7xPmci7YCiL54fKMmbHFMx',
  'client_secret': 'EHjOl8-nGvtxGmVeeBiVCiFpVzJNv9NJhVxComQz3ppJ7Nm4_xc-0jqQY8XgVyo6kCFVkZpIHAf-Td2C'

});

const app = express();
app.use(methodOverride('_method'))

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use(methodOverride("_method"));


// override using a query value
app.use(methodOverride("_method"));


route(app);

// catch 404 and forward to error handler

// app.use((req, res, next) => {
//   next(createError(404));
// });


// error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};


//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });


module.exports = app;
