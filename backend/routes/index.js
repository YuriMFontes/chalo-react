const express = require('express');
const router = express.Router();
const User = require('../models/User');
const checkToken = require('../middleware/checkToken');
const UserController = require('../controllers/UserController');

// Rota inicial pública
router.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem vindo a nossa API!' });
});

// Rota para registrar um novo usuário
router.post('/auth/register', UserController.registrarUsuario);

// Rota para login de usuário
router.post('/auth/login', UserController.loginUsuario);

// Rota para solicitar redefinição de senha
router.post('/auth/forgot_password', UserController.esqueceuSenha);

// Rota para redefinir senha
router.post('/auth/reset_password', UserController.resetarSenha);

// Rota para listar usuario
router.get('/user/:user_id', UserController.listarUsuario);


module.exports = router;
