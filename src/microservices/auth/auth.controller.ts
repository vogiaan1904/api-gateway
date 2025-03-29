import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { RequestWithUser } from 'src/types';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  RegisterResponse,
} from './auth.pb';
import { JwtAccessTokenGuard } from './guards/jwt-access.guard';

@Controller('auth')
export class AuthController implements OnModuleInit {
  private svc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('register')
  private async register(
    @Body() body: RegisterRequest,
  ): Promise<Observable<RegisterResponse>> {
    return this.svc.register(body);
  }

  @Post('login')
  private async login(
    @Body() body: LoginRequest,
  ): Promise<Observable<LoginResponse>> {
    const response = this.svc.login(body);
    console.log('response', response);
    return response;
  }

  @UseGuards(JwtAccessTokenGuard)
  @Post('refresh-token')
  private async refreshToken(
    @Req() request: RequestWithUser,
    @Body() body: { refreshToken: string },
  ): Promise<Observable<RefreshTokenResponse>> {
    const userId = request.user.id;
    const payload: RefreshTokenRequest = {
      refreshToken: body.refreshToken,
      userId,
    };
    return this.svc.refreshToken(payload);
  }
}
