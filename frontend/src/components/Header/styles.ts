import styled from 'styled-components';

export const HeaderStyle = styled.header`
  display: flex;
  background: #D73835;
  justify-content: center;
  height: 198px;
  align-items: center;
`;

export const Content = styled.div`
width: 100%;
max-width: 1216px;
display: flex;
align-items: center;
justify-content: space-between;

.page-details {
  h1{
    color: white;
    font-size: 32px;
  }
  h2{
    color: white;
    font-weight: 400;
    font-size: 16px;
    opacity: 0.9;
    margin-top: 6 px;
  }
}
`;
