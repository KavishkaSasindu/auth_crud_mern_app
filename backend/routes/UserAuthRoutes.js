const express = require("express");
const UserAuthController = require("../controller/UserAuthController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/api/signUp", UserAuthController.signUpUser);
router.post("/api/signIn", UserAuthController.signInUser);
router.get("/api/dashboard", authMiddleware, UserAuthController.dashboard);

module.exports = router;
