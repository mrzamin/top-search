const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/userController");
const isAdmin = require("../controllers/userController").isAdmin;

router.get("/signup", user_controller.user_create_get);

router.post("/signup", user_controller.user_create_post);

router.get("/login", user_controller.user_login_get);

router.post("/login", user_controller.user_login_post);

router.get("/logout", user_controller.user_logout_get);

router.get("/admin", isAdmin, user_controller.admin_dashboard_get);

module.exports = router;
