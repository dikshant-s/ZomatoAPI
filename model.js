const mongoose = require('mongoose');
// const { INTEGER } = require('sequelize');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  emai: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model("data",userSchema);