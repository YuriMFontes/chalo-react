import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                email,
                password
            });

            const { msg, token } = response.data;
            setMessage(msg);

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
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br/><br/>

                <label htmlFor="password">Senha:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br/><br/>

                <button type="submit">Entrar</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
