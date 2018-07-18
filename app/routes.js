const router = require('express').Router();

// controllers
const videoController = require('./controllers/videoController'); 

// routes
router.get('/', videoController.index);
router.get('/videos', videoController.getVideos);
router.get('/videos/:slug', videoController.getVideo);
router.post('/videos', videoController.createVideo);
router.patch('/videos/:slug', videoController.updateVideo);
router.delete('/videos/:slug', videoController.deleteVideo);

module.exports = router;
