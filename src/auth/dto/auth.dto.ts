import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString({})
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 0,
    },
    { message: 'password should be len 8 and contain 1 number and 1 upper case letter' },
  )
  password: string;
}
