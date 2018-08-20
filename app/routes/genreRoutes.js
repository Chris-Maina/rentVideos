const router = require('express').Router();
const { validateSlug, schemas } = require('../helpers/routeHelpers');

// controllers
const verifyToken = require('../controllers/verifyToken');
const genreController = require('../controllers/genreController');

router.route('/')
    .get(verifyToken, genreController.getGenres)
    .post(verifyToken, genreController.createGenre);

router.route('/:slug')
    .get(verifyToken, validateSlug(schemas.slugSchema), genreController.getGenre)
    .patch(verifyToken, validateSlug(schemas.slugSchema), genreController.updateGenre)
    .delete(verifyToken, validateSlug(schemas.slugSchema), genreController.deleteGenre);

module.exports = router;
