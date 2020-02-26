const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const moment = require("moment");
const { Schema } = mongoose;

const ownerSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: "Email already exists"
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    required: true
  },
  created: {
    type: String,
    default: () => moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
  }
});

ownerSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("Owner", ownerSchema);
