const router = require('express').Router();

// controllers
const userController = require('./controllers/userController');
const videoController = require('./controllers/videoController');
const verifyToken = require('./controllers/verifyToken');
const genreController = require('./controllers/genreController');
const directorController = require('./controllers/directorController');

// routes
router.get('/', videoController.index);
router.post('/user/register', userController.userExists, userController.registerUser);
router.post('/user/login', userController.loginUser);
router.get('/videos', verifyToken,videoController.getVideos);
router.get('/videos/:slug', videoController.getVideo);
router.post('/videos', verifyToken,videoController.createVideo);
router.patch('/videos/:slug', videoController.updateVideo);
router.delete('/videos/:slug', videoController.deleteVideo);
router.get('/genres', verifyToken, genreController.getGenres);
router.post('/genres', verifyToken, genreController.createGenre);
router.get('/genres/:id', verifyToken, genreController.getGenre);
router.patch('/genres/:id', verifyToken, genreController.updateGenre);
router.delete('/genres/:id', verifyToken, genreController.deleteGenre);
router.get('/directors', verifyToken, directorController.getDirectors);
router.post('/directors', verifyToken, directorController.createDirector);
router.get('/directors/:id', verifyToken, directorController.getDirector);
router.patch('/directors/:id', verifyToken, directorController.updateDirector);
router.delete('/directors/:id', verifyToken, directorController.deleteDirector);

module.exports = router;
