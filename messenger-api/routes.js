const express = require('express');
const router = express.Router();

const UsuarioController = require('./controllers/UsuarioController');
const EmailController = require('./controllers/EmailController')

router.use('/usuarios', UsuarioController)
router.use('/emails', EmailController)

module.exports = router;