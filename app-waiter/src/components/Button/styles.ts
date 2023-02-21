import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
background: ${({ disabled }) => disabled ? '#999' : '#6F4E37'};
border-radius: 48px;
padding: 14px 24px;
align-items: center;
justify-content: center;
`;
