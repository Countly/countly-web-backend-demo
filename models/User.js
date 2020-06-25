const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const User = new Schema({
  customerID: Number,  
  password: String,
  name: String,
  email: String,
  phone: String,
  picture: String,
  gender: String,
  byear: Number,
  hasLoan: Boolean,
  hasCreditCard: Boolean,
  hasInvestment: Boolean,
  hasActiveInternetBanking: Boolean,
  hasActiveMobileBanking: Boolean,
  wrCashWithdrawAttempt: Number,
  wrCashWithdrawSuccess: Number,
  wrCashWithdrawUnsuccessful: Number,
  QR: Boolean
});

module.exports = mongoose.model('User',User);
