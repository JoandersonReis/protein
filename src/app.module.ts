import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersController } from './modules/users/users.controller';
import { UsersRepository } from './modules/users/users.repository';
import { UsersService } from './modules/users/users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: '/users/login', method: RequestMethod.POST },
        { path: '/users', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
