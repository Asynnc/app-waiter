import { useState } from 'react';
import { OrderProps } from '../../types/Order';
import { OrderModal } from '../OrderModal';
import { Board, OrdersContainer } from './styles';

interface OrdersBoardsProps {
  icon?: string;
  title: string;
  orders: OrderProps[]
}

export function OrdersBoards({ icon, title, orders }: OrdersBoardsProps) {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | OrderProps>();

  function handleOpenOrderModal(order: OrderProps) {
    setSelectedOrder(order);
    setIsModalVisible(true);
  }

  function handleCloseOrderModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  return (
    <Board >
      <OrderModal isVisible={isModalVisible} order={selectedOrder || null} onClose={handleCloseOrderModal}/>
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>( {orders.length} )</span>
      </header>
      {
        orders.length > 0 && (
          <OrdersContainer>
            {
              orders.map((order) => (
                <button type='button' key={order._id} onClick={() => handleOpenOrderModal(order)}>
                  <strong>Mesa {order.table}</strong>
                  <span>{order.products.length} itens</span>
                </button>
              ))
            }

          </OrdersContainer>
        )
      }
    </Board>
  );
}
