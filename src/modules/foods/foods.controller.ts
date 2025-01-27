import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { FoodsService } from './foods.service';
import { TShowQuery } from './types';

@Controller()
export class FoodsController {
  constructor(private readonly service: FoodsService) {}

  @Post('/foods')
  async create(
    @Body() body: Prisma.FoodCreateInput,
    @Res() response: Response,
  ) {
    const food = await this.service.create(body);

    return response.status(201).json({
      food,
    });
  }

  @Get('/foods')
  async show(@Query() query: TShowQuery, @Res() response: Response) {
    const result = await this.service.show(
      query.name,
      Number(query.page) || undefined,
      Number(query.limit) || undefined,
    );

    return response.json(result);
  }
}
