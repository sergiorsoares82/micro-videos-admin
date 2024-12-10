import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModel } from './core/category/infra/db/sequelize/category.model';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    CategoriesModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}