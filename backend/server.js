/* imports */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const crypto = require('crypto');

const app = express();

app.use(cors());

// Configuração para receber JSON
app.use(express.json());

// Models
const User = require('./models/User');

// Rota inicial pública
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem vindo a nossa API!' });
});

// Rota privada para obter usuário por ID
app.get('/user/:id', checkToken, async (req, res) => {
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

// Middleware para verificar token JWT
function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'Acesso Negado!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded; // Adicionar o usuário decodificado ao objeto de requisição
        next();
    } catch (error) {
        res.status(400).json({ msg: 'Token inválido!' });
    }
}

// Registrar usuário
app.post('/auth/register', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    // Validações
    if (!name || !email || !password) {
        return res.status(422).json({ msg: 'Todos os campos são obrigatórios!' });
    }

    if (password !== confirmPassword) {
        return res.status(422).json({ msg: 'As senhas não conferem!' });
    }

    try {
        // Checar se o usuário já existe
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(422).json({ msg: 'E-mail já cadastrado!' });
        }

        // Criptografar senha
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        // Criar usuário
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
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    // Validações
    if (!email || !password) {
        return res.status(422).json({ msg: 'E-mail e senha são obrigatórios!' });
    }

    try {
        // Verificar se o usuário existe
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado!' });
        }

        // Verificar a senha
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(422).json({ msg: 'Senha inválida!' });
        }

        // Gerar token JWT
        const token = jwt.sign({ id: user._id }, process.env.SECRET);

        res.status(200).json({ msg: 'Autenticação realizada com sucesso!' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Erro ao realizar login.' });
    }
});

// Esqueceu a senha
app.post('/auth/forgot_password', async (req, res) => {
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

app.post('/auth/reset_password', async (req, res) => {
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

        // Atualizar a senha do usuário
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

// Configuração do MongoDB
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@chalo.wr4ccdj.mongodb.net/?retryWrites=true&w=majority&appName=Chalo`
)
    .then(() => {
        app.listen(3000);
        console.log('Conectado ao banco de dados MongoDB!');
    })
    .catch((err) => {
        console.error(err.message);
        process.exit(1);
    });
