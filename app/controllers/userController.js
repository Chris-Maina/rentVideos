const router = require('express').Router();
const byrpt = require('bcrypt');
const User = require('./../models/User');

router.post('/register', (res, req) => {
  const { username, email, password } = req.body;
  // hash password
  const hashedPassword;
  byrpt.hash(password).then( (hash) =>{ hashedPassword = hash} );
  User.create({
    username,
    email,
    password: hashedPassword,
  }, (err) => {
    if (err) res.json({
      status: res.statusCode,
      message: err.message,
    })
    res.json({ status: res.statusCode, message: 'You are successfully registered'});
  });
});
