const express = require('express');
const router = express.Router();
const User = require('../models/User');
const checkToken = require('../middleware/checkToken');
const UserController = require('../controllers/UserController');
const ProductController = require('../controllers/ProductController')

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
router.get('/user/:id', UserController.listarUsuario);

//Rota para produtos
router.post('/products/:id', ProductController.criarProduto)
router.get('/products/:id', ProductController.listarUsuarioProdutos)
router.patch('/products/:id/:product_id', ProductController.editarProduto)
router.delete('/products/:id/:product_id', ProductController.deletarProduto)

router.get('/products', ProductController.listarProdutos)
router.get('/produtcts/:product_id', ProductController.listarProdutosById)

router.post('/cart/:id')
router.get('/cart/:id')


router.get('/cart/:id/:cart_id')


module.exports = router;
