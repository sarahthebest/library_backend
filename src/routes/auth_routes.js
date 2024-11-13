const express = require("express");
const router = express.Router();
const {
    register_user,
    login,
    cookie_consent,
} = require("../controllers/auth_controller");

router.post("/register", register_user);
router.post("/login", login);
router.post("/set_consent", cookie_consent);

module.exports = router;
