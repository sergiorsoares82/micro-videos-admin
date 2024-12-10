import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategorySequelizeRepository } from '../core/category/infra/db/sequelize/category-sequelize.repository';
import { CategoryModel } from '../core/category/infra/db/sequelize/category.model';
import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { CategoriesModule } from './categories.module';
import { DatabaseModule } from 'src/database/database.module';
//piramide de testes


describe('CategoriesController', () => {
  let controller: CategoriesController;
  const mockCategorySequelizeRepository = {
    // Mocked methods and properties
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, CategoriesModule],
      controllers: [CategoriesController],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    console.log(controller);
    expect(controller).toBeDefined();
  });
});