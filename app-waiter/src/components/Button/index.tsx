
import { ReactNode } from 'react';
import { Text } from '../Text';
import { Container } from './styles';

interface ButtonProps {
  children: ReactNode;
  onPress: () => void;
  isDisabled?: boolean;
}

export function Button({ children, onPress, isDisabled }: ButtonProps) {

  return (
    <Container onPress={onPress} disabled={isDisabled}>
      <Text weight='SemiBold' color='#FFF' >
        {children}
      </Text>
    </Container>
  );

}
