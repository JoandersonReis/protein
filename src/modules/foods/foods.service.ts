import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FoodsRepository } from './foods.repository';

@Injectable()
export class FoodsService {
  constructor(private repository: FoodsRepository) {}

  async create(data: Prisma.FoodCreateInput) {
    const food = await this.repository.create(data);

    return food;
  }

  async show(name?: string, page: number = 1, limit: number = 10) {
    const result = await this.repository.show(page, limit, {
      name: {
        startsWith: name,
      },
    });

    return result;
  }
}
