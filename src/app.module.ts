import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { FoodsController } from './modules/foods/foods.controller';
import { FoodsRepository } from './modules/foods/foods.repository';
import { FoodsService } from './modules/foods/foods.service';
import { UsersController } from './modules/users/users.controller';
import { UsersRepository } from './modules/users/users.repository';
import { UsersService } from './modules/users/users.service';

@Module({
  imports: [],
  controllers: [UsersController, FoodsController],
  providers: [UsersService, UsersRepository, FoodsRepository, FoodsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: '/users/login', method: RequestMethod.POST },
        { path: '/users', method: RequestMethod.POST },
        { path: '/foods', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
