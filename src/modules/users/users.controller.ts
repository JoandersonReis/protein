import { Body, Controller, Post, Res } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
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
      return response.json(err[0]).status(err[1]);
    }
  }
}
