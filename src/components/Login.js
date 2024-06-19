import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../styles/Login.css'; 
import Header from '../components/Header'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                email,
                password
            });

            const { msg, token } = response.data;
            setMessage(msg);
            setShowPopup(true);

            // Salvar o token em localStorage
            localStorage.setItem('token', token);

            // Redirecionar para outra página após o login, se necessário
            // Exemplo: history.push('/dashboard');
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.msg);
            } else {
                setMessage('Erro ao conectar-se ao servidor.');
            }
            setShowPopup(true);
        }
    };

    const handleForgotPassword = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/auth/forgot_password', {
                email
            });

            setMessage(response.data.msg);
            setShowPopup(true);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.msg);
            } else {
                setMessage('Erro ao conectar-se ao servidor.');
            }
            setShowPopup(true);
        }
    };

    return (
        <>
        <Header/>
        <div className='main-container'>
            <div className='login'>
                <h2>Entrar</h2>
                <form onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='input-group'>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <p>
                    <a href="#" onClick={handleForgotPassword}>Esqueceu a senha?</a>
                    </p>
                    <br /><br />
                    <button type="submit">Entrar</button>
                </form>
                <p className='create-register'>
                    Não tem uma conta ainda?
                    <a href="/auth/regis"> Criar conta</a>
                </p>

                {showPopup && (
                    <div className="popup">
                        <p>{message}</p>
                        <button onClick={() => setShowPopup(false)}>Fechar</button>
                    </div>
                )}
            </div>
        </div>
        </>
    );
};

export default Login;
