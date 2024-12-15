import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CreateCategoryFixture } from '../../src/nest-modules/categories-module/testing/category-fixture';
import { ICategoryRepository } from '../../src/core/category/domain/category.repository';
import { CATEGORY_PROVIDERS } from '../../src/nest-modules/categories-module/categories.providers';
import { AppModule } from '../../src/app.module';
import { applyGlobalConfig } from '../../src/nest-modules/global-config';
import { startApp } from '../../src/nest-modules/shared-module/testing/helpers';
import { Uuid } from '@core/shared/domain/value-objects/uuid.vo';
import { CategoriesController } from 'src/nest-modules/categories-module/categories.controller';
import { CategoryOutputMapper } from '@core/category/application/common/category-output';
import { instanceToPlain } from 'class-transformer';

describe('CategoriesController (e2e)', () => {
  const appHelper = startApp();
  let categoryRepo: ICategoryRepository;
  
  beforeEach(async () => {
    categoryRepo = appHelper.app.get<ICategoryRepository>(
      CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
    );
  });
  
  describe('/categories (POST)', () => {
    describe('should return a response error with 422 status code when request body is invalid', () => {
      const invalidRequest = CreateCategoryFixture.arrangeInvalidRequest();
      const arrange = Object.keys(invalidRequest).map((key) => ({
        label: key,
        value: invalidRequest[key],
      }));
    
      test.each(arrange)('when body is $label', ({ value }) => {
        return request(appHelper.app.getHttpServer())
          .post('/categories').send(value.send_data)
          .expect(422)
          .expect(value.expected);
        });
      });
      describe('should return a response error with 422 status code when throw EntityValidationError', () => {
        const invalidRequest =
          CreateCategoryFixture.arrangeForEntityValidationError();
        const arrange = Object.keys(invalidRequest).map((key) => ({
          label: key,
          value: invalidRequest[key],
        }));
        test.each(arrange)('when body is $label', ({ value }) => {
          return request(appHelper.app.getHttpServer())
            .post('/categories')
            .send(value.send_data)
            .expect(422)
            .expect(value.expected);
        });
      });
      describe('should create a category', () => {
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
            expect(Object.keys(res.body.data)).toStrictEqual(keysInResponse);
            const id = res.body.data.id;
            const categoryCreated = await categoryRepo.findById(new Uuid(id));
            const presenter = CategoriesController.serializeCategory(
              CategoryOutputMapper.toOutput(categoryCreated),
            );
            const serialized = instanceToPlain(presenter);
            expect(res.body.data).toStrictEqual({
              id: serialized.id,
              created_at: serialized.created_at,
              ...expected,
            });
          },
        );
      });
  });
});