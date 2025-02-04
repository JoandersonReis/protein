import prisma from 'prisma/prisma';
import { TCreateDiet } from './types';

export class DietRepository {
  async create(data: TCreateDiet, userId: string) {
    const diet = await prisma.diet.create({
      data: { ...data, user_id: userId },
    });

    return diet;
  }

  async show(userId: string) {
    const diets = await prisma.diet.findMany({
      where: {
        user_id: userId,
      },
    });

    return diets;
  }
}
