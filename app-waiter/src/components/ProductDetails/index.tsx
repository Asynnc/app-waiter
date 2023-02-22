import { FlatList, Modal } from 'react-native';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { CloseButton, Footer, FooterContainer, Header, Image, Ingredient, IngredientsContainer, ModalBody, PriceContainer } from './styles';

interface ProductDetailsProps {
  isVisible: boolean;
  onClose: () => void;
  product: null | Product;
  onAddToCart: (product: Product) => void;
}



export function ProductDetailsModal({ isVisible, onClose, product, onAddToCart }: ProductDetailsProps) {

  if (!product) {
    return null;
  }

  function handleAddToCart(product: Product) {
    onAddToCart(product);
    onClose();
  }

  return (
    <Modal
      visible={isVisible}
      animationType={'slide'}
      presentationStyle={'pageSheet'}
      onRequestClose={onClose}
    >
      <Image source={{ uri: `http://localhost:3001/uploads/${product.imagePath}` }}>
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Image>
      <ModalBody>
        <Header>
          <Text size={24} weight={'SemiBold'}> {product.name} </Text>
          <Text color='#666' style={{ marginTop: 8 }}> {product.description} </Text>
        </Header>

        {product.ingredients.length > 0 && (
          <IngredientsContainer>
            <Text weight='SemiBold' color='#666'> Ingredientes </Text>

            <FlatList
              data={product.ingredients}
              keyExtractor={ingredient => ingredient._id}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 16 }}
              renderItem={({ item: ingredient }) => (
                <Ingredient>
                  <Text> {ingredient.icon} </Text>
                  <Text color='#666' size={14} style={{ marginLeft: 20 }}> {ingredient.name} </Text>
                </Ingredient>
              )}
            />
          </IngredientsContainer>
        )}
      </ModalBody>
      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text color='#666'> Preço </Text>
            <Text size={20} weight={'SemiBold'}> {formatCurrency(product.price)} </Text>
          </PriceContainer>

          <Button onPress={() => handleAddToCart(product)}> Adicionar ao carrinho </Button>
        </FooterContainer>
      </Footer>
    </Modal>
  );
}
