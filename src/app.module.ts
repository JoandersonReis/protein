import { Module } from '@nestjs/common';
import { UsersController } from './modules/users/users.controller';
import { UsersRepository } from './modules/users/users.repository';
import { UsersService } from './modules/users/users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class AppModule {}
