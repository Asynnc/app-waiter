import { useState } from 'react';
import { FlatList } from 'react-native';
import { Category } from '../../types/Category';
import { Text } from '../Text';
import { Category as CategoryContainer, Icon } from './styles';

interface CategoriesProps {
  categories: Category[];
  onSelectCategory: (categoryID: string) => Promise<void>;
}


export function Categories({ categories, onSelectCategory }: CategoriesProps) {

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  function handleSelectCategory(categoryID: string) {
    const category = selectedCategory === categoryID ? '' : categoryID;
    onSelectCategory(category);
    setSelectedCategory(category);
  }

  return (
    <>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 24 }}
        data={categories}
        keyExtractor={category => category._id}
        renderItem={({ item: category }) => {

          const isSelected = selectedCategory === category._id;


          return (
            <CategoryContainer key={category._id} onPress={() => handleSelectCategory(category._id)}>
              <Icon>
                <Text opacity={isSelected ? 1 : 0.5} > {category.icon} </Text>
              </Icon>
              <Text size={14} opacity={isSelected ? 1 : 0.5} weight='SemiBold'> {category.name} </Text>

            </CategoryContainer>
          );
        }}
      />


      {/* {categories.map((category) => (
        <Category key={category._id}>
          <Icon>
            <Text> {category.icon} </Text>
          </Icon>
          <Text size={14} weight='SemiBold'> {category.name} </Text>

        </Category>
      ))} */}
    </>
  );
}
