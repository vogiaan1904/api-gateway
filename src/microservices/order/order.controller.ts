import {
  Controller,
  Inject,
  Post,
  OnModuleInit,
  UseGuards,
  Req,
  Body,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import {
  OrderServiceClient,
  ORDER_SERVICE_NAME,
  CreateRequest,
} from './protos/order.pb';
import { RequestWithUser } from 'src/types';
import { JwtAccessTokenGuard } from '../auth/guards/jwt-access.guard';
import { CreateOrderRequestDto } from './dtos/create-order.request.dto';
import { Empty } from './protos/google/protobuf/empty.pb';
import { FindManyOrderResponseDto } from './dtos/find-many-orders.response.dto';
import { query } from 'express';
import { FindManyOrderRequestDto } from './dtos/find-many-orders.request.dto';
import { OrderResponseDto } from './dtos/order.response.dto';

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
  private createOrder(
    @Req() req: RequestWithUser,
    @Body() body: CreateOrderRequestDto,
  ): Observable<Empty> {
    const { id: userId } = req.user;

    return this.svc.createOrder({
      productId: body.productId,
      quantity: body.quantity,
      userId,
    });
  }

  @Get(':id')
  @UseGuards(JwtAccessTokenGuard)
  private async findById(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
  ): Promise<OrderResponseDto> {
    const res = await firstValueFrom(this.svc.findOne({ id }));
    return new OrderResponseDto(res.order);
  }

  @Get()
  @UseGuards(JwtAccessTokenGuard)
  private async findMany(
    @Req() req: RequestWithUser,
    @Query() query: FindManyOrderRequestDto,
  ): Promise<FindManyOrderResponseDto> {
    const { id: userId } = req.user;

    const res = await firstValueFrom(
      this.svc.findMany({
        userId,
        status: query.status,
      }),
    );
    return new FindManyOrderResponseDto(res.orders);
  }
}
