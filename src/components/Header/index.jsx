import React, { useState } from "react";
import { Container, Logo, SearchContainer, SearchIcon, SearchInput, UserIcon, CartIcon } from './styles';
import { FaBars, FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import Sidebar from '../Sidebar';
import logo from '../../assets/chalo.png';

const Header = () => {
    const [sidebar, setSidebar] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const toggleSidebar = () => setSidebar(!sidebar);
    const toggleSearch = () => setSearchOpen(!searchOpen);

    return (
        <Container>
            <FaBars className="menu-icon" onClick={toggleSidebar} />

            <Logo src={logo} alt="Logo" />

            <div className="icons">
                <UserIcon>
                    <FaUser />
                </UserIcon>
                <CartIcon>
                    <FaShoppingCart />
                </CartIcon>
            </div>

            <SearchContainer>
                <SearchIcon onClick={toggleSearch}>
                    <FaSearch />
                </SearchIcon>
                {searchOpen && (
                    <SearchInput type="text" placeholder="O que você está procurando?" />
                )}
            </SearchContainer>

            {sidebar && <Sidebar active={setSidebar} />}
        </Container>
    );
};

export default Header;
