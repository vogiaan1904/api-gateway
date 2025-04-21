import { IsNotEmpty, IsString } from 'class-validator';
import { RefreshTokenRequest } from '../protos/auth.pb';

export class RefreshTokenRequestDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
