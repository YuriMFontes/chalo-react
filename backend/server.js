
/* imports */
require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors');

const app = express()

app.use(cors());


// Config JSON
app.use(express.json())

//Models
const User = require('./models/User')

// Open Route - Public Route
app.get('/', (req, res) =>(
    res.status(200).json({msg: 'Bem vindo a nossa API!'})
))

// Private Route
app.get("/user/:id", checkToken, async (req, res) => {
    const id = req.params.id

    // Checar se existe o usuario
    const user = await User.findById(id, '-password')

    if(!user){
        return res.status(404).json({msg: "Usuario não encontrado!"})
    }

    res.status(200).json({ user })

})

function checkToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({msg : "Acesso Negado!"})
    }

    try{
        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()
    } catch(error){
        res.status(400).json({msg: "Token inválido!"})
    }
}

// Registrar usuario
app.post('/auth/register', async(req, res) => {
    const {name, email, password, confirmpassword} = req.body

    //Validações
    if(!name) {
        return res.status(422).json({msg: 'O nome é obrigatório!'})
    }
    if(!email) {
        return res.status(422).json({msg: 'O email é obrigatório!'})
    }
    if(!password) {
        return res.status(422).json({msg: 'A senha é obrigatório!'})
    }

    if (password !== confirmpassword) {
        return res.status(422).json({msg: 'As Senhas não conferem!'})
    }

    // Checar se o usuario existe
    const userExists = await User.findOne({email : email})

    if (userExists) {
        return res.status(422).json({msg: 'Por favor, utilize o email'})
    }

    // Criar senha
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // Criar usuario
    const user = new User({
        name,
        email,
        password: passwordHash,
    })

    try {

        await user.save()

        res.status(201).json({msg: 'Usuario criado com sucesso!'})

    } catch(error){
        console.log(error)
        res.status(500).json({msg: 'Aconteceu um erro no servidor, tente novamento mais tarde!'})
    }

})

// Login User
app.post("/auth/login", async (req, res) => {
    const {email, password} = req.body

    //validações
    if(!email) {
        return res.status(422).json({msg: 'O e-mail é obrigatório!'})
    }
    if(!password) {
        return res.status(422).json({msg: 'A senha é obrigatório!'})
    }

    //Checar se o usuario existe
    const user = await User.findOne({email : email})

    if (!user) {
        return res.status(404).json({msg: 'Usuário não encontrado!'})
    }

    // Checar se a senha ta certa
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword){
        return res.status(422).json({msg: 'Senha inválida'})
    }


    try{

        const secret = process.env.SECRET

        const token = jwt.sign({
            id: user._id,
        },
        secret,
    )


    res.status(200).json({msg: "Autenticação realizada com sucesso!", token})

    }catch(error) {
        console.log(error)
        res.status(500).json({msg: 'Aconteceu um erro no servidor, tente novamento mais tarde!'

        })
    }


})


// Credenciais
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
    .connect(
        `mongodb+srv://${dbUser}:${dbPassword}@chalo.wr4ccdj.mongodb.net/?retryWrites=true&w=majority&appName=Chalo`
    )
    .then(() => {
        app.listen(3000)
        console.log('Conectou ao banco!')

    })
    .catch((err) => console.log(err))
