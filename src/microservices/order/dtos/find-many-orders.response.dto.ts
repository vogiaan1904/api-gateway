import { OrderData } from '../protos/order.pb';
import { OrderResponseDto } from './order.response.dto';

export class FindManyOrderResponseDto {
  items: OrderResponseDto[];

  constructor(items: Partial<OrderData>[] = []) {
    this.items = items.map((item) => new OrderResponseDto(item));
  }
}
