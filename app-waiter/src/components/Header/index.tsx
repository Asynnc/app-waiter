import { Text } from '../Text';
import { Container } from './styles';

export function Header() {
  return (
    <Container>
      <Text size={14} opacity={0.9} >Bem vindo (a) ao</Text>
      <Text size={24}>PRO
        <Text size={24} weight='Bold'>CAFÉ
          <Text size={24}>
            INAR
          </Text>
        </Text>
      </Text>

    </Container>
  );
}