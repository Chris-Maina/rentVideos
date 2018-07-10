const router = require('express').Router();
const byrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const config = require('../../config/config');

exports.userExists = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } }).then((user) => {
    if (!user) return next();
    res.status(409).json({
      status: 'failure',
      message: `${user.username} already exists. Use another name`
    });
  });
};

exports.registerUser = (req, res) => {
  const { username, email, password } = req.body;
  // // hash password
  const hashedPassword = '';
  byrpt.hash(password).then(hash => hashedPassword = hash);
  User.create({
    username,
    email,
    password: hashedPassword
  }).then(user =>
    res.status(201).json({ status: 'success', message: `${user.username} is successfully registered` })
  ).catch(() =>
    res.status(500).json({ status: 'failure', message: 'An error occured while registering you' })
  );
};

exports.loginUser = (req, res) => {
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

    if (!user) res.json({
      status: 404,
      message: 'The user does not seem to exist'
    })

    // compare passwords
    const passwordIsValid = byrpt.compare(password, user.password);
    if (!passwordIsValid) res.json({
      status: 401,
      message: 'Password mismatch'
    })

    // sign the token that expires in 24 hours
    const token = jwt.sign({ email: user.email }, config.secret, { expiresIn: 86400 });
    res.json({
      status: res.statusCode,
      token,
      message: 'Successfully logged in'
    });
  });
};
