import { Module } from '@nestjs/common';

import { BrandsService } from './services/brands.service';
import { BrandsController } from './controllers/brands.controller';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';

@Module({
  controllers: [BrandsController, CategoriesController, ProductsController],
  providers: [BrandsService, CategoriesService, ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
