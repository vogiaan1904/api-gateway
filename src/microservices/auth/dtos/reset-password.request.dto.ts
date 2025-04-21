import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { ResetPasswordRequest } from '../protos/auth.pb';

export class ResetPasswordRequestDto implements ResetPasswordRequest {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
  })
  password: string;
}
