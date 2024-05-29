const { body } = require("express-validator");

/* Not currently implemented */
exports.loginValidate = [
  // Check Username
  body("username", "Username Must Be Three Characters")
    .isLength({ min: 3 })
    .trim()
    .escape(),
  // Check Password
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password Must Be at Least 8 Characters")
    .matches("[0-9]")
    .withMessage("Password Must Contain a Number")
    .matches("[A-Z]")
    .withMessage("Password Must Contain an Uppercase Letter")
    .trim()
    .escape(),
];

exports.checkRegisterCredentials = function () {
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
      .escape();
};
