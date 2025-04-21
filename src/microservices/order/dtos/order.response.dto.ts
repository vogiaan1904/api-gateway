import { OrderData, OrderStatus } from '../protos/order.pb';

export class OrderResponseDto {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  totalAmount: number;
  status: string;

  constructor(data: Partial<OrderData> = {}) {
    this.id = data.id ?? '';
    this.userId = data.userId ?? '';
    this.productId = data.productId ?? '';
    this.productName = data.productName ?? '';
    this.productPrice = data.productPrice ?? 0;
    this.quantity = data.quantity ?? 0;
    this.totalAmount = data.totalAmount ?? 0;
    this.status =
      orderStatusToString(data.status) ??
      orderStatusToString(OrderStatus.DEFAULT);
  }
}

function orderStatusToString(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.DEFAULT:
      return 'DEFAULT';
    case OrderStatus.PROCESSING:
      return 'PROCESSING';
    case OrderStatus.COMPLETED:
      return 'COMPLETED';
    case OrderStatus.CANCELLED:
      return 'CANCELLED';
    case OrderStatus.PENDING:
      return 'PENDING';
    default:
      return 'UNKNOWN';
  }
}
