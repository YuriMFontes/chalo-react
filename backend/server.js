require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@chalo.wr4ccdj.mongodb.net/?retryWrites=true&w=majority&appName=Chalo`
)
    .then(() => {
        app.listen(3000, () => {
            console.log('Conectado ao banco de dados MongoDB e servidor rodando na porta 3000!');
        });
    })
    .catch((err) => {
        console.error(err.message);
        process.exit(1);
    });

// Importando e usando as rotas
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/authRoutes');

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
