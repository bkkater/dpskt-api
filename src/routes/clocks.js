const router = require('express').Router();

const clockController = require('../controllers/clockController');

router.route('/clocks').post((req, res) => clockController.create(req, res));

router.route('/clocks').get((req, res) => clockController.getAll(req, res));

router.route('/clocks/:id').get((req, res) => clockController.get(req, res));

router.route('/clocks/:id').delete((req, res) => clockController.delete(req, res));

router.route('/clocks/:id').put((req, res) => clockController.update(req, res));

module.exports = router;