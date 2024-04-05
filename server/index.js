const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/user")

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/users");

app.post('/register', (req, res) =>{
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
// app.post('/home', (req, res) =>{
//    res.redirect(".home.jsx")
// })
app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if (user) {
            if (user.password === password) {
                res.json("Login Success!")
            } else {
                res.json("User already exists!")
            }
        } else {
            res.json("User is not registered!")
        }
    }) 
})

app.listen(8000, () => {
    console.log("Database connected!");
})


