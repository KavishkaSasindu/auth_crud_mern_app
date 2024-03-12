const express = require("express");
const UserAuthController = require("../controller/UserAuthController");
const router = express.Router();

router.post("/api/signUp", UserAuthController.signUpUser);
router.post("/api/signIn", UserAuthController.signInUser);

module.exports = router;
