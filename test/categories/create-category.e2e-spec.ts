import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CreateCategoryFixture } from '../../src/nest-modules/categories-module/testing/category-fixture';
import { ICategoryRepository } from '../../src/core/category/domain/category.repository';
import { CATEGORY_PROVIDERS } from '../../src/nest-modules/categories-module/categories.providers';
import { AppModule } from '../../src/app.module';
import { applyGlobalConfig } from '../../src/nest-modules/global-config';
import { startApp } from '../../src/nest-modules/shared-module/testing/helpers';

describe('CategoriesController (e2e)', () => {
  const appHelper = startApp();
  let categoryRepo: ICategoryRepository;
  
  beforeEach(async () => {
    categoryRepo = appHelper.app.get<ICategoryRepository>(
      CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
    );
  });
  
  describe('/categories (POST)', () => {
    const arrange = CreateCategoryFixture.arrangeForCreate();
    
    test.each(arrange)(
      'when body is $send_data',
      async ({ send_data, expected }) => {
        const res = await request(appHelper.app.getHttpServer())
          .post('/categories')
          .send(send_data)
          .expect(201);
        const keysInResponse = CreateCategoryFixture.keysInResponse;
        expect(Object.keys(res.body)).toStrictEqual(['data']);
      },
    );
  });
});