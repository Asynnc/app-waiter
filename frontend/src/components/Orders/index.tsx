import { ordersMock } from '../../mocks/order';
import { OrdersBoards } from '../OrdersBoards';
import { Container } from './styles';

export function Orders() {
  return (
    <Container>
      <OrdersBoards icon='⏱️' title='Fila de espera' orders={ordersMock} />
      <OrdersBoards icon='🔥' title='Em produção' orders={[]} />
      <OrdersBoards icon='✅' title='Finalizado' orders={[]} />
    </Container>
  );
}
