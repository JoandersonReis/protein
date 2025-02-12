import { Injectable } from '@nestjs/common';
import ErrorResponse from 'src/lib/responseMessage';
import { DietRepository } from './diets.repository';
import { TCreateDiet } from './types';

@Injectable()
export class DietsService {
  constructor(private repository: DietRepository) {}

  async create(data: TCreateDiet, userId: string) {
    const diet = await this.repository.create(data, userId);

    if (!diet) {
      throw ErrorResponse.throw('Erro desconhecido!', 400);
    }

    return diet;
  }

  async show(userId: string) {
    const diets = await this.repository.show(userId);

    return diets;
  }

  async delete(id: string, userId: string) {
    await this.repository.delete(id, userId);
  }
}
