import { useState } from 'react';
import { FlatList } from 'react-native';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductDetailsModal } from '../ProductDetails';
import { Text } from '../Text';
import { AddToCartButton, ProductContainer, ProductDetails, ProductImage, Separator } from './styles';

interface MenuProps {
  onAddToCart: (product: Product) => void;
  products: Product[]
}

export function Menu({ onAddToCart, products }: MenuProps) {

  const [isVisible, setIsVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenModal(product: Product) {
    setIsVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        ItemSeparatorComponent={Separator}
        keyExtractor={product => product._id}
        renderItem={({ item: product }) => {

          return (
            <ProductContainer onPress={() => handleOpenModal(product)}>
              <ProductImage source={{
                uri: `http://localhost:3001/uploads/${product.imagePath}`
              }} />
              <ProductDetails>
                <Text weight='SemiBold'>{product.name}</Text>
                <Text color='#666' size={14} style={{ marginVertical: 8 }}> {product.description} </Text>
                <Text size={14} weight='SemiBold'> {formatCurrency(product.price)} </Text>
              </ProductDetails>

              <AddToCartButton onPress={() => onAddToCart(product)}>
                <PlusCircle />
              </AddToCartButton>
            </ProductContainer>
          );
        }}
      />

      <ProductDetailsModal
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
    </>
  );
}
