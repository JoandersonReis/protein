import { Prisma } from '@prisma/client';
import prisma from 'prisma/prisma';

export class UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    await prisma.user.create({
      data,
    });
  }
}
