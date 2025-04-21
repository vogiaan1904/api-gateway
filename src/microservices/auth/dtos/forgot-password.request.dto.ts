import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ForgotPasswordRequest } from '../protos/auth.pb';

export class ForgotPasswordRequestDto implements ForgotPasswordRequest {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
