import { Product } from '../../../../models/Product';

export class ListProductService {
  public async execute() {
    const products = await Product.find();
    return products || [];
  }
}
