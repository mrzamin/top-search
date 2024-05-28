const createError = require("http-errors");
const express = require("express");
const path = require("path");
const session = require("express-session");

const passport = require("passport");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const databaseRouter = require("./routes/database");
const MongoStore = require("connect-mongo");

/**
 * -------------- Create the Express application ----------------
 */
const app = express();

/**
 * -------------- Connect to database ----------------
 */
require("./config/database");
// const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);
// const mongoDB =
//   "mongodb+srv://marisaminard:topresource@top-database.zxr2rrg.mongodb.net/test?retryWrites=true&w=majority&appName=top-database";
// main().catch((err) => console.log(err));
// async function main() {
//   await mongoose.connect(mongoDB);
// }

/**
 * -------------- General setup ----------------
 */
require("dotenv").config();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/**
 * -------------- SESSIONS ----------------
 */

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
require("./config/passport");

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_STRING,
    }),
  })
);
app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});
app.use(passport.session());

/**
 * -------------- Setup view engine and views ----------------
 */
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

/**
 * -------------- Setup view engine and views ----------------
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

/**
 * -------------- ROUTES ----------------
 */

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/database", databaseRouter);

/**
 * -------------- ERRORS ----------------
 */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
