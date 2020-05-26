const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../common/utils/middlewares/authCheck');

const users = require('./users');
const product = require('./product');



router.use('/users', users);
router.use('/product',isAuthenticated,product);


module.exports = router;
