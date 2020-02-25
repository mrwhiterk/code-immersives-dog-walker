const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  comparePassword: async (incomingPassword, userPassword) => {
    try {
      return await bcrypt.compare(incomingPassword, userPassword);
    } catch (error) {
      return false;
    }
  },

  generateJWT: async user => {
    let payload = {
      email: user.email,
      id: user._id,
      photo: user.photo
    };

    return jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: 36000
    });
  }
};
