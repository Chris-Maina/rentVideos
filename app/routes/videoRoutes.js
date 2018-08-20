const router = require('express').Router();
const { validateSlug, schemas } = require('../helpers/routeHelpers');

// controllers
const verifyToken = require('../controllers/verifyToken');
const videoController = require('../controllers/videoController');

router.route('/')
    .get(verifyToken, videoController.getVideos)
    .post(verifyToken, videoController.createVideo);

router.route('/:slug')
    .get(verifyToken, validateSlug(schemas.slugSchema), videoController.getVideo)
    .patch(verifyToken, validateSlug(schemas.slugSchema), videoController.updateVideo)
    .delete(verifyToken, validateSlug(schemas.slugSchema), videoController.deleteVideo);

router.route('/:slug/genres')
    .get(verifyToken,validateSlug(schemas.slugSchema), videoController.getVideoGenre)
    .post(verifyToken, validateSlug(schemas.slugSchema), videoController.createVideoGenre);

router.route('/:slug/directors')
    .get(verifyToken, validateSlug(schemas.slugSchema), videoController.getVideoDirector)
    .post(verifyToken, validateSlug(schemas.slugSchema), videoController.createVideoDirector);


module.exports = router;