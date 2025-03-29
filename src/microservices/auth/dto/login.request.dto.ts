import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { LoginRequest } from '../auth.pb';

export class LoginRequestDto implements LoginRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
