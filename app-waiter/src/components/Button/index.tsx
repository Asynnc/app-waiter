
import { ReactNode } from 'react';
import { ActivityIndicator } from 'react-native';
import { Text } from '../Text';
import { Container } from './styles';

interface ButtonProps {
  children: ReactNode;
  onPress: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export function Button({ children, onPress, isDisabled, isLoading }: ButtonProps) {

  return (
    <Container onPress={onPress} disabled={isDisabled || isLoading} >

      {isLoading ? (
        <ActivityIndicator color={'#FFF'} />
      ) : (
        <Text weight='SemiBold' color='#FFF' >
          {children}
        </Text>
      )}

    </Container>
  );

}
