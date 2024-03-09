import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  isNotEmpty,
} from 'class-validator';
import { Industry, AccountType } from '../enums';

export class CreateAccountDto {
  @IsString()
  firsName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  alias: string;

  @IsString()
  jobTitle: string;

  @IsPhoneNumber('MX')
  officePhone: string;
  @IsPhoneNumber()
  mobilePhone: string;

  @IsEmail()
  email: string;

  // @IsUrl()
  // @isNotEmpty(true)
  website: string;

  @IsEnum(Industry)
  @IsOptional()
  industry: string;
  @IsOptional()
  @IsEnum(AccountType)
  type: string;
}
