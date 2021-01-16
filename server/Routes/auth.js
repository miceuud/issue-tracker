const express = require('express');
const router = express.Router();

// import routes
const { register, login } = require('../Controllers/auth');

router.route('/register').post(register);
router.route('/login').post(login);

module.exports = router;
