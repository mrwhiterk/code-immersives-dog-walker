const mongoose = require("mongoose");
const moment = require("moment");
const { Schema } = mongoose;

const walkerSchema = new Schema({
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
  password: {
    type: String,
    required: true
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

module.exports = mongoose.model("Walker", walkerSchema);
