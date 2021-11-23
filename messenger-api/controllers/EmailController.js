const express = require('express');
const router = express.Router();
const EmailService = require('../services/EmailService')
const verifyJWT = require('../middlewares/AuthMiddleware')

router.get('/', verifyJWT, EmailService.findAll);
router.post('/', verifyJWT, EmailService.insert);

module.exports = router