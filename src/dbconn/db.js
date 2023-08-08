const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/register_db");
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const salt = bcrypt.genSaltSync(5);
const secret = 'WakeUpToReality'

app.use(cors({credentials:true, origin:"http://localhost:3000"}));
app.use(express.json());
mongoose.connect(
  "mongodb+srv://root:ggwp@shop.ciq5ynx.mongodb.net/?retryWrites=true&w=majority"
);
app.use(cookieParser())

app.post("/register", async function (req, res) {
  const { email, password, username, contact_no, gender } = req.body;
  try {
    const userdoc = await User.create({
      username,
      email,
      password:bcrypt.hashSync(password, salt),
      gender,
      contact_no,
    });
    res.json(userdoc);
  } catch (error) {
    res.status(400).json(error)
  }
});

app.post("/login", async function (req, res) {
  const { email, password_login } = await req.body;
  const userdoc = await User.findOne({email})
  const passOk = bcrypt.compareSync(password_login, userdoc.password)
  if(passOk){
    jwt.sign({username:userdoc.username, id:userdoc._id}, secret, {}, (err, token) => {
      if(err) throw err;
      res.cookie("token", token).json({
        id:userdoc._id,
        username: userdoc.username
      })
    })
  } else{
    res.status(400).json("Invalid Credentials")
  }
  
});


app.get("/profile", function(req, res){
  const {token} = req.cookies
  jwt.verify(token, secret, {}, (err, info) => {
    if(err) throw err;
    res.json(info)
  })

})


app.post("/logout", function(req, res){
  res.cookie("token", "").json("ok")
})
app.listen(4000);

//mongodb+srv://root:ggwp@shop.ciq5ynx.mongodb.net/?retryWrites=true&w=majority
