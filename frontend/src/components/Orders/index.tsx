import { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';
import { api } from '../../api/api';
import { OrderProps } from '../../types/Order';
import { OrdersBoards } from '../OrdersBoards';
import { Container } from './styles';

export function Orders() {

  const [orders, setOrders] = useState<OrderProps[]>([]);

  useEffect(() => {
    const socket = socketIO('http://localhost:3001', {
      transports: ['websocket'],
    });

    socket.on('orders@new', (order) => {
      setOrders(prevState => prevState.concat(order));
    });
  }, []);

  useEffect(() => {
    api.get('/orders').then((response )=> setOrders(response.data));
  }, []);



  const production = orders.filter((order) => order.status === 'IN_PRODUCTION');
  const waiting = orders.filter((order) => order.status === 'WAITING');
  const done = orders.filter((order) => order.status === 'DONE');

  function handleCancelOrder(orderID: string) {
    setOrders((prevState) => prevState.filter((order) => order._id !== orderID));
  }

  function handleOrderStatusChange(orderID: string, status: OrderProps['status']) {
    setOrders((prevState) => prevState.map((order) => (
      order._id === orderID
        ? { ...order, status }
        : order
    )));

  }

  return (
    <Container>
      <OrdersBoards icon='⏱️' title='Fila de espera' orders={waiting} onCancelOrder={handleCancelOrder} onChangeOrderStatus={handleOrderStatusChange} />
      <OrdersBoards icon='🔥' title='Em produção' orders={production} onCancelOrder={handleCancelOrder} onChangeOrderStatus={handleOrderStatusChange} />
      <OrdersBoards icon='✅' title='Finalizado' orders={done} onCancelOrder={handleCancelOrder} onChangeOrderStatus={handleOrderStatusChange} />
    </Container>
  );
}
