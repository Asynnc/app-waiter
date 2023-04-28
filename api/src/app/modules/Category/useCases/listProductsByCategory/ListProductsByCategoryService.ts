import { Product } from '../../../../models/Product';
import { IListProductsByCategory } from './ListProductsByCategoryDTO';
export class ListProductsByCategoryService {
  public async execute({ id }: IListProductsByCategory) {

    const products = await Product.find()
      .where('category')
      .equals(id);

    return products;
  }
}
