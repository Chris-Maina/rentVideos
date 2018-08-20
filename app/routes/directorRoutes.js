const router = require('express').Router();
const { validateSlug, schemas } = require('../helpers/routeHelpers');

// controllers
const verifyToken = require('../controllers/verifyToken');
const directorController = require('../controllers/directorController');

router.route('/')
    .get(verifyToken, directorController.getDirectors)
    .post(verifyToken, directorController.createDirector);

router.route('/:slug')
    .get(verifyToken, validateSlug(schemas.slugSchema), directorController.getDirector)
    .patch(verifyToken, validateSlug(schemas.slugSchema), directorController.updateDirector)
    .delete(verifyToken, validateSlug(schemas.slugSchema), directorController.deleteDirector);

module.exports = router;
