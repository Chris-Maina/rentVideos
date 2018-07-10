const router = require('express').Router();

// controllers
const userController = require('./controllers/userController');
const videoController = require('./controllers/videoController'); 

// routes
router.get('/', videoController.index);
router.post('/user/register', userController.userExists, userController.registerUser);
router.post('/user/login', userController.loginUser);
router.get('/videos/:slug', videoController.getVideo);
router.post('/videos', videoController.createVideo);
router.patch('/videos/:slug', videoController.updateVideo);
router.delete('/videos/:slug', videoController.deleteVideo);

module.exports = router;
