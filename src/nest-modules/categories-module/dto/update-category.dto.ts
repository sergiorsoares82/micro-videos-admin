// import { PartialType } from '@nestjs/mapped-types';
// import { CreateCategoryDto } from './create-category.dto';
import { UpdateCategoryInput } from '@core/category/application/use-cases/update-category/update-category.input';
import { OmitType } from '@nestjs/mapped-types';

// export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
export class UpdateCategoryInputWithoutId  extends OmitType(UpdateCategoryInput, ['id'] as const) {}

export class UpdateCategoryDto extends UpdateCategoryInputWithoutId {}