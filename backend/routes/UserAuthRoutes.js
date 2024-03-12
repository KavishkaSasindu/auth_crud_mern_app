const express = require("express");
const UserAuthController = require("../controller/UserAuthController");
const router = express.Router();

router.post("/api/signUp", UserAuthController.signUpUser);

module.exports = router;
