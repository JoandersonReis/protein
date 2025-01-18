import { sign } from 'jsonwebtoken';
import { JWT_EXPIRE } from './config';

export class JWT {
  static generateToken(secret: string, subject: string, payload?: Object) {
    const token = sign(payload, secret, {
      expiresIn: JWT_EXPIRE.access,
      subject,
    });

    return token;
  }
}
