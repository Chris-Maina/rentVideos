const router = require('express').Router();

// controllers
const userController = require('../controllers/userController');

router.post('/register', userController.userExists, userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;