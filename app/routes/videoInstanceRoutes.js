const router = require('express').Router();
const { validateSlug, schemas } = require('../helpers/routeHelpers');

// controllers
const verifyToken = require('../controllers/verifyToken');
const videoInstanceController = require('../controllers/videoInstanceController');

router.route('/')
  .get(verifyToken, videoInstanceController.getVideoInstances);

router.route('/:slug/rent')
  .post(verifyToken, validateSlug(schemas.slugSchema), videoInstanceController.rentVideo)

module.exports = router;
