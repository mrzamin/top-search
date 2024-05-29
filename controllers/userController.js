const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { generatePassword } = require("../lib/passwordUtils");
const passport = require("passport");

/* User Register form GET */
exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.render("user_create_form", {
    title: "Signup",
  });
});

/* User Register form POST */
exports.user_create_post = [
  body("username", "Username Must Be Three Characters")
    .isLength({ min: 3 })
    .trim()
    .escape(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password Must Be at Least 8 Characters")
    .matches("[0-9]")
    .withMessage("Password Must Contain a Number")
    .matches("[A-Z]")
    .withMessage("Password Must Contain an Uppercase Letter")
    .trim()
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("user_create_form", { errors: errors.array() });
    } else {
      createUser(req, res, next);
    }
  }),
];

/* Create User help function */
const createUser = asyncHandler(async (req, res, next) => {
  const hashedPassword = await generatePassword(req.body.password);
  try {
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      admin: false,
    });
    await user.save();
    res.redirect("/users/login");
  } catch (err) {
    return next(err);
  }
});

/* User Login form GET */
exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.render("user_login_form", {
    title: "Login",
  });
});

/* User Login form POST */
exports.user_login_post = async (req, res, next) => {
  passport.authenticate("local", function (err, user, options) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("user_login_form", { messages: options.message });
    }
    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/database");
    });
  })(req, res, next);
};

/* User Logout */
exports.user_logout_get = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/database");
  });
});

exports.admin_dashboard_get = asyncHandler(async (req, res, next) => {
  res.render("admin_dashboard", {});
});

/* isAuthenticated Middleware */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "You are not authorized to view this resource." });
  }
};

/* isAdmin Middleware */
exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "You are not authorized to view this resource." });
  }
};

/* Admin Dashboard GET */
exports.admin_dashboard_get = (req, res, next) => {
  res.render("admin_dashboard");
};
