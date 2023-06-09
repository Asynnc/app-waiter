import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { api } from '../../api/api';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { Text } from '../Text';
import { Actions, Image, Item, ProductContainer, ProductDetails, QuantityContainer, Summary, TotalContainer } from './styles';

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onRemove: (product: Product) => void;
  onConfirmedOrder: () => void;
  selectedTable: string;
}

export function Cart({ cartItems, onAdd, onRemove, onConfirmedOrder, selectedTable }: CartProps) {

  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const total = cartItems.reduce((total, cartItem) => {
    return total + cartItem.quantity * cartItem.product.price;
  }, 0);

  async function handleConfirmOrder() {

    setIsLoading(true);

    const payload = {
      table: selectedTable,
      products: cartItems.map((cartItem) => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity
      }))
    };

    await api.post('/orders', payload).then(
      () => {
        setIsLoading(false);
        setIsModalVisible(true);
      }
    ).catch(
      () => {
        alert('O pedido não pôde ser realizado.');
        setIsLoading(false);
      }
    );


  }

  function handleOk() {
    onConfirmedOrder();
    setIsModalVisible(false);
  }

  return (
    <>
      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item: cartItem }) => (
            <Item>

              <ProductContainer>
                <Image source={{ uri: `http://localhost:3001/uploads/${cartItem.product.imagePath}` }} />
                <QuantityContainer>
                  <Text size={14} color={'#666'}> {cartItem.quantity}* </Text>
                </QuantityContainer>
                <ProductDetails>
                  <Text size={14} weight='SemiBold'> {cartItem.product.name} </Text>
                  <Text size={14} color="#666" style={{ marginTop: 4 }}> {formatCurrency(cartItem.product.price)} </Text>
                </ProductDetails>
              </ProductContainer>
              <Actions>
                <TouchableOpacity style={{ marginRight: 24 }} onPress={() => onAdd(cartItem.product)}>
                  <PlusCircle />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onRemove(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color='#666'>Total</Text>
              <Text size={20} weight='SemiBold'> {formatCurrency(total)} </Text>
            </>
          ) : (
            <>
              <Text color='#999' size={20}>Seu carrinho está vazio!</Text>
            </>
          )}

        </TotalContainer>

        <Button
          isDisabled={cartItems.length === 0}
          isLoading={isLoading}
          onPress={handleConfirmOrder}>
          Confirmar Pedido
        </Button>
      </Summary>



      <OrderConfirmedModal isVisible={isModalVisible} onClose={handleOk} />
    </>
  );
}
