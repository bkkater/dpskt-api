const router = require('express').Router();

const playersRouter = require('./players');

router.use('/', playersRouter);

module.exports = router;
