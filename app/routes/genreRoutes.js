const router = require('express').Router();

// controllers
const verifyToken = require('../controllers/verifyToken');
const genreController = require('../controllers/genreController');

router.route('/')
    .get(verifyToken, genreController.getGenres)
    .post(verifyToken, genreController.createGenre);

router.route('/:id')
    .get(verifyToken, genreController.getGenre)
    .patch(verifyToken, genreController.updateGenre)
    .delete(verifyToken, genreController.deleteGenre);

module.exports = router;
