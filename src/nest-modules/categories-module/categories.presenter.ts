import type { CategoryOutput } from '@core/category/application/common/category-output';
import type { ListCategoriesOutput } from '@core/category/application/use-cases/list-categories/list-categories.use-case';
import { Transform } from 'class-transformer';

export class CategoryPresenter {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  @Transform(({ value }: { value: Date }) => value.toISOString())
  created_at: Date;

  constructor(output: CategoryOutput) {
    this.id = output.id;
    this.name = output.name;
    this.description = output.description;
    this.is_active = output.is_active;
    this.created_at = output.created_at;
  }
}

export class CategoryCollectionPresenter {
  data: CategoryPresenter[];
  constructor(output: ListCategoriesOutput) {
    const items = ({ items, ...paginationProps } = output);
    this.data = items.map((item) => new CategoryPresenter(item));
  }
}
