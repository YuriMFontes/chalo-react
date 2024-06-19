const express = require('express');
const router = express.Router();
const User = require('../models/User');
const checkToken = require('../middleware/checkToken');

// Rota inicial pública
router.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem vindo a nossa API!' });
});

// Rota privada para obter usuário por ID
router.get('/user/:id', checkToken, async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id, '-password');

        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado!' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Erro ao buscar usuário.' });
    }
});

module.exports = router;
