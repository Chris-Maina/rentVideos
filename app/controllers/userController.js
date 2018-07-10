const router = require('express').Router();
const byrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const config = require('../../config/config');

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

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  /**
   * find user with the username
   * sign a token with the username
   * return token
   */
  User.find({ username }, (err, user) => {
    if (err) res.json({
      status: res.statusCode,
      message: err.message
    })

    if(!user) res.json({
      status: 404,
      message: 'The user does not seem to exist'
    })

    // compare passwords
    const passwordIsValid = byrpt.compare(password, user.password);
    if (!passwordIsValid) res.json({
      status: 400,
      message: 'Password mismatch'
    })
  
    // sign the token that expires in 24 hours
    const token = jwt.sign({email: user.email}, config.secret, { expiresIn: 86400 });
    res.json({
      status: res.statusCode,
      token,
      message: 'Successfully logged in'
    })
  })
});
