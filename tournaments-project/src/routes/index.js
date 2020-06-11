const {Router} = require('express');
const main = require('./main.js');
const auth = require('./auth.js');

const router = Router();
router.use(main);
router.use(auth);

module.exports = router;