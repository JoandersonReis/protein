import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ENV } from 'src/lib/config';
import { JWT } from 'src/lib/JWT';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const [bearer, accessToken] = request.headers.authorization.split(' ');

    if (!bearer) {
      return response.status(401).json({
        error_description: 'Token must been type Bearer',
      });
    }

    if (!accessToken) {
      return response.status(401).json({
        error_description: 'Token required',
      });
    }

    try {
      const payload = JWT.verifyToken(ENV.jtwSecret, accessToken);

      request.user_id = String(payload.sub);

      next();
    } catch (err) {
      return response.status(err[1]).json(err[0]);
    }
  }
}
