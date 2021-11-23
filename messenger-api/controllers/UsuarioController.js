const express = require('express');
const router = express.Router();
const UsuarioService = require('../services/UsuarioService')
const verifyJWT = require('../middlewares/AuthMiddleware')

router.get('/', verifyJWT, UsuarioService.findAll);
router.post('/', UsuarioService.insert);
router.put('/:id', verifyJWT, UsuarioService.update);
router.delete('/:id', verifyJWT, UsuarioService.delete);
router.post('/login', UsuarioService.findByEmailAndSenha)

module.exports = router