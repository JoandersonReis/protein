import { sign, verify } from 'jsonwebtoken';
import { JWT_EXPIRE } from './config';
import ErrorResponse from './responseMessage';

export class JWT {
  static generateToken(secret: string, subject: string, payload?: Object) {
    const token = sign(payload, secret, {
      expiresIn: JWT_EXPIRE.access,
      subject,
    });

    return token;
  }

  static verifyToken(secret: string, token: string) {
    const payload = verify(token, secret);

    if (!payload) {
      throw ErrorResponse.throw('Invalid token', 401);
    }

    return payload;
  }
}
