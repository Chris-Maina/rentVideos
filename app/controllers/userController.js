const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const config = require('../../config/config');

exports.userExists = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next();
  return res.status(409).json({
    status: 'failure',
    message: `${user.username} already exists. Use another name`
  });
};

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  /**
   * hash password
   * create user
   */
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });
    res.status(201).json({ status: 'success', message: `${user.username} is successfully registered` })

  } catch (err) {
    res.status(400).json({ status: 'failure', message: 'There seems to be an error registering you. Please try again later.' })
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  /**
   * find user with the username
   * generate token with the username
   * return token
   */
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({
      status: 'failure',
      message: 'The user does not seem to exist'
    })
    // compare passwords
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) return res.status(401).json({
      status: 'failure',
      message: 'Password mismatch'
    });
    // sign the token that expires in 24 hours
    const token = jwt.sign({ email: user.email }, config.secret, { expiresIn: 86400 });
    return res.status(200).json({
      status: 'success',
      token,
      message: 'Successfully logged in'
    });

  } catch (err) {
    res.status(400).json({ status: 'failure', message: 'There seems to be a probrem logging in. Please try again later.' });
  }
};
