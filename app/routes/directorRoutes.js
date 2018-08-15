const router = require('express').Router();

// controllers
const verifyToken = require('../controllers/verifyToken');
const directorController = require('../controllers/directorController');

router.route('/')
    .get(verifyToken, directorController.getDirectors)
    .post(verifyToken, directorController.createDirector);

router.route('/:id')
    .get(verifyToken, directorController.getDirector)
    .patch(verifyToken, directorController.updateDirector)
    .delete(verifyToken, directorController.deleteDirector);

module.exports = router;
