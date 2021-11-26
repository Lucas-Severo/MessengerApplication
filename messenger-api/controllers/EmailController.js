const express = require('express');
const router = express.Router();
const EmailService = require('../services/EmailService')
const verifyJWT = require('../middlewares/AuthMiddleware')

router.get('/enviados', verifyJWT, EmailService.findAllEnviados);
router.get('/recebidos', verifyJWT, EmailService.findAllRecebidos);
router.put('/visualizar/:id', verifyJWT, EmailService.visualizarEmail);
router.get('/:id', verifyJWT, EmailService.findById);
router.post('/', verifyJWT, EmailService.insert);

module.exports = router