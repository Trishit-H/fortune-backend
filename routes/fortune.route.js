const express = require('express');
const { getFortune } = require('./../controllers/fortune.controller');

const router = express.Router();

router.route('/').get(getFortune);

module.exports = router;
