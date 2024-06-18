import styled from 'styled-components';

export const Container = styled.div`
    height: 200px;
    display: flex;
    align-items: center;
    background-color: black;
    box-shadow: 0 0 20px 3px;
    padding: 0 32px; 
    position: relative; 

    .menu-icon {
        color: white;
        width: 45px;
        height: 45px;
        cursor: pointer;
        position: absolute; 
        left: 40px; 
        z-index: 1; 
    }

    .icons {
        display: flex;
        position: absolute;
        right: 70px;
    }

    @media (max-width: 990px) {
        height: 120px; /* ajusta a altura para tela menor */
        padding: 0; /* remove o padding */
        justify-content: center; /* centraliza os elementos horizontalmente */
        
        .menu-icon {
            left: 10px; /* ajusta a posição do ícone para tela menor */
        }

        .icons {
            position: static;
            display: flex;
            justify-content: flex-end;
            flex: 1;
        }
    }
`;

export const Logo = styled.img`
    height: 140px; 
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 990px) {
        height: 60px; /* ajusta a altura para tela menor */
        
    }
`;

export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative; 

    @media (max-width: 990px) {
        flex: 1; /* Ocupa o espaço disponível */
    }
`;

export const SearchIcon = styled.div`
    color: white;
    font-size: 20px;
    cursor: pointer;
    margin-right: 16px;
`;

export const SearchInput = styled.input`
    padding: 8px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    color: #fd729c;
    transition: width 0.10s ease; /* Adiciona transição suave */

    &:focus {
        color: #fd729c;
        width: 200px; /* Largura fixa quando focado */
    }
`;

export const UserIcon = styled.div`
    color: white;
    font-size: 20px;
    cursor: pointer;
    margin-right: 16px;
`;

export const CartIcon = styled.div`
    color: white;
    font-size: 20px;
    cursor: pointer;
    margin-right: 16px;
`;
