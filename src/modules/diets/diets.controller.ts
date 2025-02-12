import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Validation } from 'src/lib/Validation';
import { createDietSchema } from 'src/lib/zodSchemas/diets.schema';
import { DietsService } from './diets.service';

@Controller()
export class DietsController {
  constructor(private readonly service: DietsService) {}

  @Post('/diets')
  async create(@Req() request: Request, @Res() response: Response) {
    try {
      Validation.validate(request, createDietSchema);

      const body = request.body;

      const data = {
        name: body.name,
        mounth: body.mounth,
      };

      const diet = await this.service.create(data, request.user_id);

      return response.status(201).json(diet);
    } catch (err) {
      return response.status(err[1]).json(err[0]);
    }
  }
}
