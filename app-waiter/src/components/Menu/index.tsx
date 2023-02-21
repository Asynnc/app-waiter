import { FlatList } from 'react-native';
import { products } from '../../mocks/products';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import { AddToCartButton, Product, ProductDetails, ProductImage, Separator } from './styles';

export function Menu() {
  return (
    <FlatList
      data={products}
      style={{ marginTop: 32 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      ItemSeparatorComponent={Separator}
      keyExtractor={product => product._id}
      renderItem={({ item: product }) => {

        return (
          <Product>
            <ProductImage source={{
              uri: `http://192.168.1.102:3001/uploads/${product.imagePath}`
            }} />
            <ProductDetails>
              <Text weight='SemiBold'>{product.name}</Text>
              <Text color='#666' size={14} style={{ marginVertical: 8 }}> {product.description} </Text>
              <Text size={14} weight='SemiBold'> {formatCurrency(product.price)} </Text>
            </ProductDetails>

            <AddToCartButton>
              <PlusCircle />
            </AddToCartButton>
          </Product>
        );
      }}
    />
  );
}
