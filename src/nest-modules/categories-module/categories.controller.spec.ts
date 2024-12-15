import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/nest-modules/database-module/database.module';
import { CategoriesController } from './categories.controller';
import { CategoriesModule } from './categories.module';
import { ConfigModule } from 'src/nest-modules/config-module/config.module';
//piramide de testes


describe('CategoriesController', () => {
  let controller: CategoriesController;
  const mockCategorySequelizeRepository = {
    // Mocked methods and properties
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({}), DatabaseModule, CategoriesModule],
      controllers: [CategoriesController],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});