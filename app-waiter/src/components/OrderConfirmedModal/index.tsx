import { Modal } from 'react-native';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';
import { Container, OkButton } from './styles';

interface OrderConfirmedModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export function OrderConfirmedModal({ isVisible, onClose }: OrderConfirmedModalProps) {


  return (
    <Modal visible={isVisible} animationType='fade'>
      <Container>
        <CheckCircle />
        <Text
          size={20}
          weight='SemiBold'
          color='#FFF'
          style={{ marginTop: 12 }}
        >Pedido confirmado</Text>
        <Text
          color='#FFF'
          weight='SemiBold'
          opacity={0.9}
          style={{ marginTop: 4 }}
        >Seu pedido ja foi enviado para cozinha!</Text>

        <OkButton onPress={onClose}>
          <Text weight='SemiBold' color='#6F4E37'>FEITO!</Text>
        </OkButton>

      </Container>
    </Modal>
  );
}
