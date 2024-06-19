// Header.js
import React, { useState } from "react";
import { Container, Logo, UserIcon, CartIcon } from './styles';
import { FaBars, FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import Sidebar from '../Sidebar';
import logo from '../../assets/chalo.png';
import { useNavigate } from 'react-router-dom';


const Header = () => {

    const navigate = useNavigate();

    const [sidebar, setSidebar] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState('');

    const toggleSidebar = () => setSidebar(!sidebar);
    const toggleSearch = () => setSearchOpen(!searchOpen);

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleUserIconClick = () => {
        navigate('/auth'); 
    };

    
    const handleLogoClick = () => {
        navigate('/'); 
    }

    return (
        <Container>
            <FaBars className="menu-icon" onClick={toggleSidebar} />

            <Logo src={logo} alt="Logo" onClick={handleLogoClick} />

            <div className={`icons ${searchOpen ? 'icons-shifted' : ''}`}>
                <UserIcon open={searchOpen} onClick={handleUserIconClick}>
                    <FaUser />
                </UserIcon>
                <CartIcon open={searchOpen}>
                    <FaShoppingCart />
                </CartIcon>
            </div>
            {sidebar && <Sidebar active={setSidebar} />}
        </Container>
    );
};

export default Header;
