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
import { firstValueFrom, Observable } from 'rxjs';
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
import { AuthService } from './auth.service';
import { LoginResponseDto, RefreshTokenResponseDto } from './dtos/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  private async register(@Body() body: RegisterRequest): Promise<void> {
    return await this.authService.register(body);
  }

  @Post('login')
  private async login(@Body() body: LoginRequest): Promise<LoginResponseDto> {
    return await this.authService.login(body);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Post('refresh-token')
  private async refreshToken(
    @Req() request: RequestWithUser,
    @Body() body: { refreshToken: string },
  ): Promise<RefreshTokenResponseDto> {
    const userId = request.user.id;
    const req: RefreshTokenRequest = {
      refreshToken: body.refreshToken,
      userId,
    };
    return this.authService.refreshToken(req);
  }
}
