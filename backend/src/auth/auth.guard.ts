import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';
import { jwtConfig } from '../config';
import { JwtPayload } from './jwt.payload';
import { Request } from 'express';
import { RequestWithUser } from './request-with-user.interface';
import { Unauthorized } from '../common/dto.out/default.401.dto.out';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request: RequestWithUser = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new HttpException(...Unauthorized());
    }
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret: jwtConfig.secret,
      });
      request.user = payload;
    } catch {
      throw new HttpException(...Unauthorized());
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
