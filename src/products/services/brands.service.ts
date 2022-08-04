import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dtos';

@Injectable()
export class BrandsService {
  private counterId = 1;

  private records: Brand[] = [
    {
      id: 1,
      name: 'Brand 1',
      image: 'https://github.com',
    },
  ];

  findAll() {
    return this.records;
  }

  findOne(id: number) {
    const record = this.records.find((item) => item.id === id);

    if (!record) {
      throw new NotFoundException(`Brand ${id} not found`);
    }

    return record;
  }

  create(payload: CreateBrandDto) {
    this.counterId = this.counterId + 1;
    const newRecord = {
      id: this.counterId,
      ...payload,
    };
    this.records.push(newRecord);
    return newRecord;
  }

  update(id: number, payload: UpdateBrandDto) {
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
