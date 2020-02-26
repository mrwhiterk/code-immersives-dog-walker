var express = require("express");
var router = express.Router();
let ownerController = require("../controllers/owner");
const passport = require("passport");

router.post("/signup", ownerController.signup);
router.post("/login", passport.authenticate("local"), ownerController.login);

module.exports = router;
