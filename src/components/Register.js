import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from './Header';
import '../styles/Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

       

        try {
            const response = await axios.post('http://localhost:3000/auth/register', {
                name,
                email,
                password,
                confirmPassword
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
            <Header />
            <div className='main-container'>
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
                        /><br /><br />

                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        /><br /><br />

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
                        <div className='input-group'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                placeholder="Confirme a Senha"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <br /><br />
                        <button type="submit">Criar</button>
                    </form>
                    <p className='create-register'>
                        Já possui uma conta?
                        <a href="/auth"> Entrar</a>
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

export default Register;
