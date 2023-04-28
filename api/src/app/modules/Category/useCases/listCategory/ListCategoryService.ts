import { Category } from '../../../../models/Category';

export class ListCategoryService {
  public async execute() {
    const categories = await Category.find();
    return categories || [];
  }
}
