const mongoose = require('mongoose');

mongoose.connect('mongodb://ickarakurt:3LXS4TVUk_r!WvR@ds249967.mlab.com:49967/countly_banking',{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('open', () => {
  console.log("MongoDB: Connected");
});
mongoose.connection.on('error', (err) => {
  console.log("MongoDB: Error", err);
});