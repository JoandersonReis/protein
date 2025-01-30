import { Body, Controller, Post, Res } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { TUserLoginData } from './types';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('/users/')
  async create(
    @Body() body: Prisma.UserCreateInput,
    @Res() response: Response,
  ) {
    try {
      await this.service.create(body);

      return response.json().status(201);
    } catch (err) {
      return response.status(err[1]).json(err[0]);
    }
  }

  @Post('/users/login')
  async login(@Body() body: TUserLoginData, @Res() response: Response) {
    try {
      const result = await this.service.login(body);

      return response.status(200).json(result);
    } catch (err) {
      return response.status(err[1]).json(err[0]);
    }
  }
}
