const express = require("express");
const router = express.Router();

/* GET database home page. */
router.get("/", function (req, res, next) {
  res.redirect("/database");
});

module.exports = router;
