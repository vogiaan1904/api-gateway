import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  ParseIntPipe,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  ProductServiceClient,
  PRODUCT_SERVICE_NAME,
  CreateProductResponse,
  CreateProductRequest,
  FindByIdResponse,
} from './product.pb';
import { JwtAccessTokenGuard } from '../auth/guards/jwt-access.guard';

@Controller('product')
export class ProductController implements OnModuleInit {
  private svc: ProductServiceClient;

  @Inject(PRODUCT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc =
      this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  @Post()
  @UseGuards(JwtAccessTokenGuard)
  private async createProduct(
    @Body() body: CreateProductRequest,
  ): Promise<Observable<CreateProductResponse>> {
    return this.svc.createProduct(body);
  }

  @Get(':id')
  @UseGuards(JwtAccessTokenGuard)
  private async findById(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<Observable<FindByIdResponse>> {
    return this.svc.findById({ id });
  }
}
