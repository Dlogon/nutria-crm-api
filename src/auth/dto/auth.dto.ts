import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minUppercase: 1,
  })
  password: string;
}
