import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: white; 
  font-size: 20px;
  color: #fd729c;
  padding: 7px;
  cursor: pointer;
  border-radius: 10px;
  margin: 0 15px 10px;
  border: 2px solid #fd729c;

  > svg {
    margin: 0 20px;
  }

  &:hover {
    background-color: #fd729c;
    color: white;
  }
`;