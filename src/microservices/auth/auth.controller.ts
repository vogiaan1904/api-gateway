import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { RequestWithUser } from 'src/types';
import { ForgotPasswordRequestDto } from './dtos/forgot-password.request.dto';
import { LoginRequestDto } from './dtos/login.request.dto';
import { RefreshTokenRequestDto } from './dtos/refresh-token.request.dto';
import { RegisterRequestDto } from './dtos/register.request.dto';
import { SendVerificationEmailRequestDto } from './dtos/send-verification-email.request.dto';
import { JwtAccessTokenGuard } from './guards/jwt-access.guard';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from './protos/auth.pb';
import { Empty } from './protos/google/protobuf/empty.pb';

@Controller('auth')
export class AuthController {
  private svc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('register')
  private register(@Body() body: RegisterRequestDto): Observable<Empty> {
    return this.svc.register(body);
  }

  @Post('login')
  private login(@Body() body: LoginRequestDto): Observable<LoginResponse> {
    return this.svc.login(body);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Post('refresh-token')
  private refreshToken(
    @Req() request: RequestWithUser,
    @Body() body: RefreshTokenRequestDto,
  ): Observable<RefreshTokenResponse> {
    const userId = request.user.id;
    const req: RefreshTokenRequest = {
      refreshToken: body.refreshToken,
      userId,
    };

    return this.svc.refreshToken(req);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Post('reset-password')
  private resetPassword(
    @Req() request: RequestWithUser,
    @Body() body: RefreshTokenRequestDto,
  ): Observable<Empty> {
    const userId = request.user.id;
    const req: RefreshTokenRequest = {
      refreshToken: body.refreshToken,
      userId,
    };

    return this.svc.refreshToken(req);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Post('forgot-password')
  private forgotPassword(
    @Req() request: RequestWithUser,
    @Body() body: ForgotPasswordRequestDto,
  ): Observable<Empty> {
    return this.svc.forgotPassword(body);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Post('send-verification-email')
  private sendVerificationEmail(
    @Req() request: RequestWithUser,
    @Body() body: SendVerificationEmailRequestDto,
  ): Observable<Empty> {
    return this.svc.sendVerificationEmail(body);
  }
}
