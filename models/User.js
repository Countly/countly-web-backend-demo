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
  hasLoan: Boolean,
  hasCreditCard: Boolean
});

module.exports = mongoose.model('User',User);
