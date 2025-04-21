import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { SendVerificationEmailRequest } from '../protos/auth.pb';

export class SendVerificationEmailRequestDto
  implements SendVerificationEmailRequest
{
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
