const Owner = require("../model/owner");
const authHelper = require("../lib/helpers/authHelper");
const dbErrorHandler = require("../lib/helpers/dbErrorHandler");
// const bcrypt = require("bcryptjs");
const passport = require("passport");
const authenticate = require("../authenticate");

module.exports = {
  signup: (req, res) => {
    let { email, password, firstName, lastName, phone } = req.body;
    Owner.register(
      new Owner({ email, firstName, lastName, phone }),
      password,
      err => {
        if (err) {
          res.status(500).send({ err });
        } else {
          passport.authenticate("local")(req, res, async (err, data) => {
            const owner = await Owner.findOne({ email });
            const token = authenticate.getToken({ _id: owner._id });
            res.json({
              success: true,
              token,
              status: "Registration Successful!"
            });
          });
        }
      }
    );
  },

  login: (req, res) => {
    const token = authenticate.getToken({ _id: req.user._id });
    res.send({ success: true, token, status: "you are logged in" });
  }
};
