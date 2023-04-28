import { AppError } from '../../../../errors';
import { Category } from '../../../../models/Category';
import { ICreateCategory } from './CreateCategoryDTO';

export class CreateCategoryService {
  public async execute({ icon, name }: ICreateCategory) {

    const categoryAlreadyExists = await Category.findOne({ name });

    if (categoryAlreadyExists) {
      throw new AppError('This category already exists.', 400);
    }

    const category = await Category.create({
      name,
      icon
    });

    return category;
  }
}
