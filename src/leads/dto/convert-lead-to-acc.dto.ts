import { IsEmail, IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { AccountType, Industry } from '@app/accounts/enums';

export class ConvertLeadToAccountDto {
  @IsString()
  @IsOptional()
  alias?: string;

  @IsString()
  @IsOptional()
  jobTitle?: string;

  @IsEmail()
  email: string;

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
