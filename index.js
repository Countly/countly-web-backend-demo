var express = require('express');
const axios = require("axios");
const User = require('./models/User');
var cors = require('cors')
var app = express();
const db = require('./helpers/db');
const port = 5000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.options('*', cors())



/* GET home page. */
app.get('/', async function(req, res, next) {
  const users = await User.find();
  res.render('index', { users : users} )
});


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
app.post('/user/add', async function(req, res, next) {
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
app.post('/user/login', async function(req, res, next) {
  const { username , password } = req.body;
  try {
    let user = await User.findOne({ username, password });
    res.json(user)
  } catch (err) {
    res.json({ status : false })
  }


});



