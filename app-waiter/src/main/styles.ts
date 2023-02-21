import { Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';

const isAndroid = Platform.OS === 'android';

StatusBar.currentHeight;

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
  background: #FAFAFA;
`;


export const CategoriesContainer = styled.View`
margin-top: 34px;
height: 73px;
`;


export const MenuContainer = styled.View`

flex: 1;

`;

export const Footer = styled.View`
background: #FFF;
min-height: 110px;
padding: 16px 24px;
`;


export const FooterContainer = styled.SafeAreaView`

`;
