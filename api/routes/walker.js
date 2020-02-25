var express = require("express");
var router = express.Router();
let walkerController = require("../controllers/walker");

router.post("/signup", walkerController.signup);
router.post("/login", walkerController.login);

module.exports = router;
