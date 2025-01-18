import { Prisma } from '@prisma/client';
import prisma from 'prisma/prisma';
import ErrorResponse from 'src/lib/responseMessage';
import { TUser } from './types';

export class UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const newUser = await prisma.user.create({
      data,
    });
  }

  async unique(where: Prisma.UserWhereUniqueInput): Promise<TUser | null> {
    const user = await prisma.user.findUnique({
      where,
    });

    if (!user) {
      throw ErrorResponse.throw('USUÁRIO NÃO EXISTE', 404);
    }

    return user;
  }
}
