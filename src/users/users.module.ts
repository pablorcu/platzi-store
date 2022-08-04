import { Module } from '@nestjs/common';

import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { CustomersService } from './services/customers.service';
import { CustomersController } from './controllers/customers.controller';

import { ProductsModule } from "../products/products.module";

@Module({
  imports: [ProductsModule],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
