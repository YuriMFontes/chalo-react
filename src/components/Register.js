import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/auth/register', {
                name,
                email,
                password,
                confirmpassword
            });

            setMessage(response.data.msg);
            // Pode adicionar redirecionamento ou outras lógicas aqui após o registro bem-sucedido
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.msg);
            } else {
                setMessage('Erro ao conectar-se ao servidor.');
            }
        }
    };

    return (
        <div className='register'>
            <h2>Criar conta</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="name"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                /><br/><br/>

                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br/><br/>

                <input
                    type="password"
                    id="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br/><br/>

                <input
                    type="password"
                    id="confirmpassword"
                    placeholder="Confirme a Senha"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                /><br/><br/>

                <button type="submit">Registrar</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
