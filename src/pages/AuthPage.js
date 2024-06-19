import React from 'react';
import LoginForm from '../components/Login';
import RegisterForm from '../components/Register';
import Header from '../components/Header'

const AuthPage = () => {
    return (

        <>
        <Header/>
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
            <div>
                <LoginForm />
            </div>
            <div>
                <RegisterForm />
            </div>
        </div>
        </>
    );
};

export default AuthPage;
