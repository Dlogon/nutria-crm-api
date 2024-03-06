import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Order } from './pagination.order';

export class PaginationOptions {
  //   limit: number;
  //   page: number;
  //   order: Order;
  @IsOptional()
  @IsNumber()
  limit?: number = 10;
  @IsOptional()
  @IsNumber()
  page?: number = 0;
  @IsOptional()
  @IsEnum(Order)
  order?: Order = Order.ASC;
}
