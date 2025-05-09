import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RequestWithUser } from 'src/types';
import { ValidateResponse } from '../protos/auth.pb';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAccessTokenGuard implements CanActivate {
  constructor(@Inject(AuthService) private readonly service: AuthService) {}

  public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
    const req: RequestWithUser = ctx.switchToHttp().getRequest();
    const authorization: string | undefined = req.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const parts: string[] = authorization.split(' ');
    if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
      throw new UnauthorizedException('Malformed authorization header');
    }

    const token: string = parts[1];

    const { userId, role }: ValidateResponse =
      await this.service.validate(token);

    req.user = { id: userId, role: role };

    return true;
  }
}
