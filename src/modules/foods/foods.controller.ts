import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Validation } from 'src/lib/Validation';
import { CreateFoodSchema } from 'src/lib/zodSchemas/foods.schema';
import { FoodsService } from './foods.service';
import { TShowQuery } from './types';

@Controller()
export class FoodsController {
  constructor(private readonly service: FoodsService) {}

  @Post('/foods')
  async create(@Req() request: Request, @Res() response: Response) {
    try {
      Validation.validate(request, CreateFoodSchema);

      const food = await this.service.create(request.body);

      return response.status(201).json({
        food,
      });
    } catch (err) {
      return response.status(err[1]).json(err[0]);
    }
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
