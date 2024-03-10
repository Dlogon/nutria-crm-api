import { IsEnum, IsOptional } from 'class-validator';
import { Order } from './pagination.order';

export class PaginationOptions {
  @IsOptional()
  limit?: number = 10;
  @IsOptional()
  page?: number = 0;
  @IsOptional()
  @IsEnum(Order)
  order?: Order = Order.ASC;
}
