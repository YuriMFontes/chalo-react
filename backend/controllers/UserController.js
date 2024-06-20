const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendPasswordResetEmail } = require('../utils/emailService');

// Função para registrar um novo usuário
exports.registrarUsuario = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password) {
        return res.status(422).json({ msg: 'Todos os campos são obrigatórios!' });
    }

    if (password !== confirmPassword) {
        return res.status(422).json({ msg: 'As senhas não conferem!' });
    }

    try {
        const usuarioExistente = await User.findOne({ email });

        if (usuarioExistente) {
            return res.status(422).json({ msg: 'E-mail já cadastrado!' });
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const novoUsuario = new User({
            name,
            email,
            password: passwordHash,
        });

        await novoUsuario.save();

        res.status(201).json({ msg: 'Bem-vindo, sua conta foi criada com sucesso!', novoUsuario });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Erro ao registrar usuário.' });
    }
};

// Login de usuário
exports.loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ msg: 'E-mail e senha são obrigatórios!' });
    }

    try {
        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(404).json({ msg: 'E-mail não cadastrado!' });
        }

        const senhaCorreta = await bcrypt.compare(password, usuario.password);

        if (!senhaCorreta) {
            return res.status(422).json({ msg: 'Senha inválida!' });
        }

        const token = jwt.sign({ id: usuario._id }, process.env.SECRET);

        res.status(200).json({ msg: 'Autenticação realizada com sucesso!', token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Erro ao realizar login.' });
    }
};

// Esqueceu a senha
exports.esqueceuSenha = async (req, res) => {
    const { email } = req.body;

    try {
        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(404).json({ msg: 'E-mail não encontrado!' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        const agora = new Date();
        agora.setHours(agora.getHours() + 1);

        await User.findByIdAndUpdate(usuario._id, {
            $set: {
                passwordResetToken: token,
                passwordResetExpires: agora,
            }
        });

        sendPasswordResetEmail(email, token);

        res.status(200).json({ msg: 'E-mail enviado para redefinição de senha!' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Erro ao gerar token de redefinição de senha.' });
    }
};

// Resetar senha
exports.resetarSenha = async (req, res) => {
    const { email, token, password } = req.body;

    try {
        const usuario = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpires');

        if (!usuario) {
            return res.status(404).json({ msg: 'Usuário não encontrado!' });
        }

        if (token !== usuario.passwordResetToken) {
            return res.status(400).json({ error: 'Token inválido!' });
        }

        const agora = new Date();

        if (agora > usuario.passwordResetExpires) {
            return res.status(400).json({ error: 'Token expirado! Gere um novo token.' });
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        usuario.password = passwordHash;
        usuario.passwordResetToken = undefined;
        usuario.passwordResetExpires = undefined;

        await usuario.save();

        res.status(200).json({ msg: 'Senha redefinida com sucesso!' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao redefinir a senha.' });
    }
};

// Função para o usuário
exports.listarUsuario = async (req, res) => {
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
};
