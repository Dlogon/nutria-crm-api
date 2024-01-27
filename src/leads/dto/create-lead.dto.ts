import { IsEmpty, IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { Source } from '../enums/source';

export class CreateLeadDto {
  @IsString()
  firsName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  jobTitle: string;

  @IsPhoneNumber('MX')
  officePhone: string;

  @IsPhoneNumber()
  mobilePhone: string;

  @IsEnum(Source)
  source: string;
}
