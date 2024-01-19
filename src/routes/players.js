const router = require('express').Router();

const playerController = require('../controllers/playerController');

router.route('/players').post((req, res) => playerController.create(req, res));

router.route('/players').get((req, res) => playerController.getAll(req, res));

router.route('/players/:id').get((req, res) => playerController.get(req, res));

router
  .route('/players/:id')
  .delete((req, res) => playerController.delete(req, res));

router
  .route('/players/:id')
  .put((req, res) => playerController.update(req, res));

module.exports = router;
