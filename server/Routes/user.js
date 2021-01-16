const express = require('express');
const router = express.Router();

// import routes
const { getUsers } = require('../Controllers/user');

router.route('/').get(getUsers)

module.exports = router;
