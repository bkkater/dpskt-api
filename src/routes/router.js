const router = require('express').Router();

const playersRouter = require('./players');
const clockRouter = require('./clocks');

router.use('/', playersRouter);
router.use('/', clockRouter);

module.exports = router;
