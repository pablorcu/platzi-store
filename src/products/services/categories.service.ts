import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/categories.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../dtos/categories.dtos';

@Injectable()
export class CategoriesService {
  private counterId = 1;

  private categories: Category[] = [
    {
      id: 1,
      name: 'Category uno',
    },
  ];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((item) => item.id === id);

    if (!category) {
      throw new NotFoundException(`Category ${id} not found`);
    }

    return category;
  }

  create(payload: CreateCategoryDto) {
    this.counterId = this.counterId + 1;
    const newCategory = {
      id: this.counterId,
      ...payload,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(id: number, payload: UpdateCategoryDto) {
    const category = this.findOne(id);
    const index = this.categories.findIndex((item) => item.id === id);
    this.categories[index] = {
      ...category,
      ...payload,
    };
    return this.categories[index];
  }

  remove(id: number) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category ${id} not found`);
    }
    this.categories.splice(index, 1);
    return true;
  }
}
