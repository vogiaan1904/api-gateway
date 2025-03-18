import {
  Controller,
  Inject,
  Post,
  OnModuleInit,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  CreateOrderResponse,
  OrderServiceClient,
  ORDER_SERVICE_NAME,
  CreateOrderRequest,
} from './order.pb';
import { RequestWithUser } from 'src/types';
import { JwtAccessTokenGuard } from '../auth/guards/jwt-access.guard';

@Controller('order')
export class OrderController implements OnModuleInit {
  private svc: OrderServiceClient;

  @Inject(ORDER_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
  }

  @Post()
  @UseGuards(JwtAccessTokenGuard)
  private async createOrder(
    @Req() req: RequestWithUser,
  ): Promise<Observable<CreateOrderResponse>> {
    const body: CreateOrderRequest = req.body;

    body.userId = req.user.id;
    return this.svc.createOrder(body);
  }
}
