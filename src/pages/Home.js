import Header from '../components/Header'
import React from 'react';
import Login from '../components/Login'
import Register from '../components/Register';

const Home = () => {
  return (
    <>
      <Header />
      <Login/>
      <Register/>
    </>
  );
};

export default Home;
