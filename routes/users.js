var express = require('express');
var router = express.Router();
const User = require('../models/User');
const axios = require("axios");


const getFakeData =  async () => {

  const fakeData = {}
  fakeData.customerID = Math.floor(Math.random() * 100000000);

  try {
    const response = await axios.get('https://randomuser.me/api/');
    let data = response.data;
    data = data.results[0];
    fakeData.name = data.name.first + ' ' + data.name.last,
    fakeData.email = data.email;
    fakeData.phone = '+3' + Math.floor(Math.random() * 100000000);
    fakeData.picture = data.picture.large;
    fakeData.gender = data.gender;
    fakeData.byear = 1980 + Math.floor(Math.random() * 10);
  } catch (error) {
    console.log(error);
  }
   
    return fakeData;
}


/* GET users listing. */
router.post('/add', async function(req, res, next) {
  const { username , password } = req.body;
  const fakeData = await getFakeData();
  try {
    const newUser = new User({
      username, password,
      ...fakeData
    });
    let saveUser = await newUser.save(); //when fail its goes to catch
    const users = await User.find();
    res.redirect("/")
  } catch (err) {
    console.log('err' + err);
    res.render('index', { users : users} )
    const users = await User.find();
    res.redirect("/")
  }


});



/* GET users listing. */
router.post('/login', async function(req, res, next) {
  const { username , password } = req.body;
  try {
    let user = await User.findOne({ username, password });
    res.json(user)
  } catch (err) {
    res.json({ status : false })
  }


});


module.exports = router;
