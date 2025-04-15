import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  ErrorCode,
  LoginRequest,
  RefreshTokenRequest,
  RegisterRequest,
  ValidateResponse,
} from './auth.pb';
import { LoginResponseDto, RefreshTokenResponseDto } from './dtos/response.dto';

@Injectable()
export class AuthService {
  private svc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  public async validate(token: string): Promise<ValidateResponse> {
    return firstValueFrom(this.svc.validate({ token }));
  }

  async register(body: RegisterRequest): Promise<void> {
    const registerResp = await firstValueFrom(this.svc.register(body));
    if (registerResp.error.code === ErrorCode.OK) {
      return;
    }
  }

  async login(body: LoginRequest): Promise<LoginResponseDto> {
    const loginResp = await firstValueFrom(this.svc.login(body));
    if (loginResp.error.code === ErrorCode.OK) {
      return {
        accessToken: loginResp.accessToken,
        refreshToken: loginResp.refreshToken,
      };
    } else {
      return loginResp;
    }
  }

  async refreshToken(
    body: RefreshTokenRequest,
  ): Promise<RefreshTokenResponseDto> {
    const refreshTokenResp = await firstValueFrom(this.svc.refreshToken(body));
    if (refreshTokenResp.error.code === ErrorCode.OK) {
      return {
        accessToken: refreshTokenResp.accessToken,
        refreshToken: refreshTokenResp.refreshToken,
      };
    } else {
      return refreshTokenResp;
    }
  }
}
