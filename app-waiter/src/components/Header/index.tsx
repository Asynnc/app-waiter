import { TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { Container, Content, OrderHeader, Table } from './styles';


interface HeaderProps {
  selectedTable: string;
  onCancelOrder: () => void;
}


export function Header({ selectedTable, onCancelOrder }: HeaderProps) {
  return (
    <Container>
      {!selectedTable && (
        <>
          <Text size={14} opacity={0.9} >Bem vindo (a) ao</Text>
          <Text size={24}>PRO
            <Text size={24} weight='Bold'>CAFÉ
              <Text size={24}>
                INAR
              </Text>
            </Text>
          </Text>
        </>
      )}

      {selectedTable && (
        <Content>
          <OrderHeader>
            <Text size={24} weight={'SemiBold'}> Pedidos </Text>
            <TouchableOpacity onPress={onCancelOrder}>
              <Text color={'#D73035'} weight={'SemiBold'} size={14}> cancelar pedido </Text>
            </TouchableOpacity>
          </OrderHeader>

          <Table>
            <Text color='#666'>Mesa {selectedTable} </Text>
          </Table>

        </Content>
      )}

    </Container>
  );
}
