import { Prisma } from '@prisma/client';

import { Injectable } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { ENV } from 'src/lib/config';
import { JWT } from 'src/lib/JWT';
import ErrorResponse from 'src/lib/responseMessage';
import { TUserLoginData } from './types';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async create(data: Prisma.UserCreateInput) {
    const user = await this.repository.unique({
      username: data.username,
    });

    if (user) {
      throw ErrorResponse.throw(`Usuário ${data.username} já existe!`);
    }

    const salt = genSaltSync(15);
    const hash = hashSync(data.password, salt);

    await this.repository.create({
      ...data,
      password: hash,
    });
  }

  async login(data: TUserLoginData) {
    const user = await this.repository.unique({
      username: data.username,
    });

    if (!user) {
      throw ErrorResponse.throw(
        `Usuário ${data.username} ainda não foi cadastrado!`,
      );
    }

    const passwordVerify = compareSync(data.password, user.password);

    if (!passwordVerify) {
      throw ErrorResponse.throw(`Senha incorreta!`);
    }

    const token = JWT.generateToken(ENV.jwtSecret, user.id, {
      id: user.id,
      username: data.username,
      rule: user.rule,
      premiun: user.premium,
    });

    return {
      token,
      username: user.username,
      rule: user.rule,
      premium: user.premium,
    };
  }
}
