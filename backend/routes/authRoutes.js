const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Registrar usuário
router.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password) {
        return res.status(422).json({ msg: 'Todos os campos são obrigatórios!' });
    }

    if (password !== confirmPassword) {
        return res.status(422).json({ msg: 'As senhas não conferem!' });
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(422).json({ msg: 'E-mail já cadastrado!' });
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: passwordHash,
        });

        await newUser.save();

        res.status(201).json({ msg: 'Usuário criado com sucesso!' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Erro ao registrar usuário.' });
    }
});

// Login de usuário
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ msg: 'E-mail e senha são obrigatórios!' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(422).json({ msg: 'Senha inválida!' });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET);

        res.status(200).json({ msg: 'Autenticação realizada com sucesso!', token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Erro ao realizar login.' });
    }
});

// Esqueceu a senha
router.post('/forgot_password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado!' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user._id, {
            $set: {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        res.status(200).json({ msg: 'Token de redefinição de senha gerado com sucesso!', token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Erro ao gerar token de redefinição de senha.' });
    }
});

router.post('/reset_password', async (req, res) => {
    const { email, token, password } = req.body;

    try {
        const user = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpires');

        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado!' });
        }

        if (token !== user.passwordResetToken) {
            return res.status(400).json({ error: 'Token inválido!' });
        }

        const now = new Date();

        if (now > user.passwordResetExpires) {
            return res.status(400).json({ error: 'Token expirado! Gere um novo token.' });
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        user.password = passwordHash;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save();

        res.status(200).json({ msg: 'Senha redefinida com sucesso!' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao redefinir a senha.' });
    }
});

module.exports = router;
