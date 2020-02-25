const Owner = require("../model/owner");
const authHelper = require("../lib/helpers/authHelper");
const dbErrorHandler = require("../lib/helpers/dbErrorHandler");
const bcrypt = require("bcryptjs");

module.exports = {
  signup: async (req, res) => {
    try {
      let newOwner = new Owner(req.body);
      let generateSalt = await bcrypt.genSalt(8);
      let hashedPassword = await bcrypt.hash(newOwner.password, generateSalt);
      newOwner.password = hashedPassword;
      await newOwner.save();

      let token = await authHelper.generateJWT(newOwner);

      res.send({
        success: true,
        user: newOwner,
        token
      });
    } catch (err) {
      res.status(400).send({ success: false, message: dbErrorHandler(err) });
    }
  },
  login: async (req, res) => {
    try {
      let existingUser = await Owner.findOne({ email: req.body.email });
      if (!existingUser) {
        let err = new Error("No user found");
        throw err;
      }

      let passwordsMatch = await authHelper.comparePassword(
        req.body.password,
        existingUser.password
      );

      if (passwordsMatch) {
        let token = await authHelper.generateJWT(existingUser);

        res.send({ success: true, user: existingUser, token });
      } else {
        throw new Error("Invalid Username or Password");
      }
    } catch (error) {
      res.status(401).send({ success: false, message: error.message });
    }
  }
};
