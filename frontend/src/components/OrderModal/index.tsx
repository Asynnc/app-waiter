import { Overlay, Wrapper, StatusContainer, OrderDetails, Actions } from './styles';
import closeButtonIcon from '../../assets/images/close-icon.svg';
import { OrderProps } from '../../types/Order';
import { formatCurrency } from '../../utils/formatCurrency';
import { useEffect } from 'react';

interface OrderModalProps {
  isVisible: boolean;
  order: OrderProps | null;
  onClose: () => void;
}

export function OrderModal({ isVisible, order, onClose }: OrderModalProps) {

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent){
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!isVisible || !order) {
    return null;
  }

  const total = order.products.reduce((total, { product, quantity }) => {
    return total + (product.price * quantity);
  }, 0);


  return (
    <Overlay>
      <Wrapper>
        <header>
          <strong>Mesa {order.table}</strong>
          <button>
            <img src={closeButtonIcon} alt="Botão de fechar modal de pedidos" onClick={onClose} />
          </button>
        </header>

        <StatusContainer>
          <small> Status do pedido </small>
          <div>
            <span>
              {order.status === 'WAITING' && '⏱️'}
              {order.status === 'IN_PRODUCTION' && '🔥'}
              {order.status === 'DONE' && '✅'}
            </span>
            <strong>
              {order.status === 'WAITING' && 'FILA DE ESPERA'}
              {order.status === 'IN_PRODUCTION' && 'EM PREPARAÇÃO'}
              {order.status === 'DONE' && 'PRONTO'}
            </strong>
          </div>
        </StatusContainer>
        <OrderDetails>
          <strong>Itens</strong>

          <div className="order-items">
            {order.products.map(({ _id, product, quantity }) => (
              <div className="item" key={_id}>
                <img src={`http://localhost:3001/uploads/${product.imagePath}`} alt={product.name} width="56" height="28.51" />
                <span className='quantity'> {quantity}x </span>

                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>


        </OrderDetails>
        <Actions>
          <button type='button' className='primary'>
            <span>👨🏻‍🍳</span>
            <span>INICIAR PREPARAÇÃO</span>
          </button>

          <button type='button' className='secondary'>
            <span>CANCELAR PEDIDO</span>
          </button>
        </Actions>
      </Wrapper>
    </Overlay>
  );
}
