import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Empty } from '../components/Icons/Empty';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { Text } from '../components/Text';
import { products as ProductsMock } from '../mocks/products';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import { CategoriesContainer, CenteredContainer, Container, Footer, FooterContainer, MenuContainer } from './styles';

export function Main() {

  const [isVisible, setIsVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>(ProductsMock);

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCartItems([]);
  }

  function handleAddToCart(product: Product) {

    if (!selectedTable) {
      setIsVisible(true);
    }

    setCartItems((prevState) => {
      const item = prevState.findIndex(cartItem => cartItem.product._id === product._id);

      if (item < 0) {
        return prevState.concat({
          quantity: 1,
          product
        });
      }

      const newCartItems = [...prevState];
      newCartItems[item] = {
        ...newCartItems[item],
        quantity: newCartItems[item].quantity + 1
      };

      return newCartItems;
    });
  }

  function handleRemoveToCart(product: Product) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id);

      const item = prevState[itemIndex];

      const newCartItems = [...prevState];
      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);

        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...newCartItems[itemIndex],
        quantity: newCartItems[itemIndex].quantity - 1
      };

      return newCartItems;
    });
  }

  return (
    <>
      <Container>
        <Header selectedTable={selectedTable} onCancelOrder={handleResetOrder} />
        {!isLoading && (
          <>
            <CategoriesContainer>
              <Categories />
            </CategoriesContainer>
            {
              products.length > 0 ? (
                <MenuContainer>
                  <Menu
                    onAddToCart={handleAddToCart}
                    products={products}
                  />
                </MenuContainer>
              ) : (
                <>
                  <CenteredContainer>
                    <Empty />

                    <Text color='#666' style={{ marginTop: 24 }}>Nenhum produto foi encontrado!</Text>
                  </CenteredContainer>
                </>
              )
            }
          </>
        )}

        {isLoading && (
          <CenteredContainer>
            <ActivityIndicator size={'large'} color='#6F4E37' />
          </CenteredContainer>
        )}
      </Container>
      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button onPress={() => setIsVisible(true)} isDisabled={isLoading}>
              NOVO PEDIDO
            </Button>
          )}

          {selectedTable && (
            <Cart cartItems={cartItems} onAdd={handleAddToCart} onRemove={handleRemoveToCart} onConfirmedOrder={handleResetOrder} />
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        onClose={() => setIsVisible(false)}
        isVisible={isVisible}
        onSave={handleSaveTable}
      />
    </>
  );
}
