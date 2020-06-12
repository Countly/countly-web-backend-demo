const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const User = new Schema({
  customerID: Number,  
  username: String,
  password: String,
  name: String,
  email: String,
  phone: String,
  picture: String,
  gender: String,
  byear: Number,
  hasLoan: Math.random() >= 0.5,
  hasCreditCard: Math.random() >= 0.5
});

module.exports = mongoose.model('User',User);
