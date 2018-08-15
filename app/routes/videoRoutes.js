const router = require('express').Router();

// controllers
const verifyToken = require('../controllers/verifyToken');
const videoController = require('../controllers/videoController');

router.route('/')
    .get(verifyToken, videoController.getVideos)
    .post(verifyToken, videoController.createVideo);

router.route('/:slug')
    .get(verifyToken, videoController.getVideo)
    .patch(verifyToken, videoController.updateVideo)
    .delete(verifyToken, videoController.deleteVideo);

router.route('/:slug/genres')
    .post(verifyToken, videoController.createVideoGenre);

router.route('/:slug/directors')
    .post(verifyToken, videoController.createVideoDirector);


module.exports = router;