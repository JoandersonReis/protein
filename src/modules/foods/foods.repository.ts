import { Prisma } from '@prisma/client';
import prisma from 'prisma/prisma';
import { Utils } from 'src/lib/Utils';

export class FoodsRepository {
  async create(data: Prisma.FoodCreateInput) {
    const food = await prisma.food.create({
      data,
    });

    return food;
  }

  async show(page: number, limit: number, where?: Prisma.FoodWhereInput) {
    const pagination = Utils.getPagination(page, limit);

    const foods = await prisma.food.findMany({
      where,
      orderBy: {
        calories: 'asc',
      },
      skip: pagination,
      take: limit,
    });

    const count = await prisma.food.count({
      where,
    });

    return {
      foods,
      pages: Math.round(count) || 1,
    };
  }
}
