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

        &:hover{
            color:#fd729c;
        }
    }

    .icons {
        display: flex;
        position: absolute;
        right: 100px;
    }

    @media (max-width: 990px) {
        height: 120px;
        padding: 0;
        justify-content: center;
        
        .menu-icon {
            left: 10px;
            width: 25px;
            height: 25px;


            &:hover{
                color:#fd729c;
            }
        }

        .icons {
            display: flex;
            position: absolute;
            right: 20px;
        }

    }
`;

export const Logo = styled.img`
    height: 140px;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 990px) {
        height: 70px;   
    }
`;


export const UserIcon = styled.div`
    color: white;
    font-size: 30px;
    cursor: pointer;
    margin-right: 30px;

    &:hover{
        color:#fd729c;
    }

    @media (max-width: 990px) {
        font-size: 18px;
        margin-right: 10px;
    }
`;

export const CartIcon = styled.div`
    color: white;
    font-size: 30px;
    cursor: pointer;
    margin-right: 16px;

    &:hover{
        color:#fd729c;
    }

    @media (max-width: 990px) {
        font-size: 18px;
        margin-right: 0;
    }
`;
