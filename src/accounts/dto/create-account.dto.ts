import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';
import { Industry, AccountType } from '../enums';

export class CreateAccountDto {
  @IsString()
  @IsOptional()
  firsName?: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  alias?: string;

  @IsString()
  @IsOptional()
  jobTitle?: string;

  @IsPhoneNumber('MX')
  @IsOptional()
  officePhone?: string;
  @IsPhoneNumber()
  @IsOptional()
  mobilePhone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsUrl()
  @IsOptional()
  website?: string;

  @IsEnum(Industry)
  @IsOptional()
  industry?: string;
  @IsOptional()
  @IsEnum(AccountType)
  type?: string;
}
