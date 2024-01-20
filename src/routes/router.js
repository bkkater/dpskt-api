const router = require('express').Router();

const usersRouter = require('./users');
const clocksRouter = require('./clocks');

router.use('/', usersRouter);
router.use('/', clocksRouter);

module.exports = router;
