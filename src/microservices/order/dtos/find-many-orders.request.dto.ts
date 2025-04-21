import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from '../protos/order.pb';

export class FindManyOrderRequestDto {
  @IsOptional()
  @IsString()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
