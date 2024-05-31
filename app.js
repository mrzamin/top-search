/**
 * -------------- Create Express App ------------
 */
const express = require("express");
const app = express();

/**
 * -------------- Connect DB --------------------
 */
require("./config/database");

/**
 * -------------- General Setup ------------------
 */
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/**
 * -------------- Passport Authentication ------------
 */
const session = require("express-session");
const passport = require("passport");
require("./config/passport");
const MongoStore = require("connect-mongo");

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
 * -------------- Local User Variable -----------------
 */
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

/**
 * -------------- View Engine and Views ---------------
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

/**
 * -------------- Routes -----------------------------
 */
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const databaseRouter = require("./routes/database");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/database", databaseRouter);

/**
 * -------------- ERRORS ----------------------------
 */
const createError = require("http-errors");

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
