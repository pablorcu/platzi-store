import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';

import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}

  private counterId = 1;

  private records: User[] = [
    {
      id: 1,
      email: 'pcampoverde@hotmail.com',
      password: '12345678',
      role: 'admin',
    },
  ];

  findAll() {
    const apikey = this.configService.get('API_KEY');
    const dbname = this.configService.get('DATABASE_NAME');
    console.log(apikey, dbname);

    return this.records;
  }

  findOne(id: number) {
    const record = this.records.find((item) => item.id === id);

    if (!record) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return record;
  }

  create(payload: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newRecord = {
      id: this.counterId,
      ...payload,
    };
    this.records.push(newRecord);
    return newRecord;
  }

  update(id: number, payload: UpdateUserDto) {
    const record = this.findOne(id);
    const index = this.records.findIndex((item) => item.id === id);
    this.records[index] = {
      ...record,
      ...payload,
    };
    return this.records[index];
  }

  remove(id: number) {
    const index = this.records.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User ${id} not found`);
    }
    this.records.splice(index, 1);
    return true;
  }

  getOrderbyUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
