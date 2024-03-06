import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUrl,
  isNotEmpty,
} from 'class-validator';
import { Industry } from '../enums/industry';
import { AccountType } from '../enums/accountType';

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
  industry: string;

  @IsEnum(AccountType)
  type: string;
}
