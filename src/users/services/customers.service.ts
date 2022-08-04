import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dtos';

@Injectable()
export class CustomersService {
    private counterId = 1;

    private records: Customer[] = [
      {
        id: 1,
        name: 'Juan',
        lastName: 'Lopez',
        phone: '072888888',
      },
    ];
  
    findAll() {
      return this.records;
    }
  
    findOne(id: number) {
      const record = this.records.find((item) => item.id === id);
  
      if (!record) {
        throw new NotFoundException(`Customer ${id} not found`);
      }
  
      return record;
    }
  
    create(payload: CreateCustomerDto) {
      this.counterId = this.counterId + 1;
      const newRecord = {
        id: this.counterId,
        ...payload,
      };
      this.records.push(newRecord);
      return newRecord;
    }
  
    update(id: number, payload: UpdateCustomerDto) {
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
        throw new NotFoundException(`Brand ${id} not found`);
      }
      this.records.splice(index, 1);
      return true;
    }

}
