var express = require("express");
var router = express.Router();
let ownerController = require("../controllers/owner");

router.post("/signup", ownerController.signup);
router.post("/login", ownerController.login);

module.exports = router;
