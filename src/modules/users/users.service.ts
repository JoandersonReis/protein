import { Prisma } from '@prisma/client';

import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async create(data: Prisma.UserCreateInput) {
    const salt = genSaltSync(15);
    const hash = hashSync(data.password, salt);

    await this.repository.create({
      ...data,
      password: hash,
    });
  }
}
