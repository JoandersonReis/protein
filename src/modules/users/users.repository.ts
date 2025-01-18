import { Prisma } from '@prisma/client';
import prisma from 'prisma/prisma';
import { TUser } from './types';

export class UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    await prisma.user.create({
      data,
    });
  }

  async unique(where: Prisma.UserWhereUniqueInput): Promise<TUser | null> {
    const user = await prisma.user.findUnique({
      where,
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
