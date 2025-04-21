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
  Query,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import {
  ProductServiceClient,
  PRODUCT_SERVICE_NAME,
  CreateProductRequest,
  FindByIdResponse,
  FindManyResponse,
} from './protos/product.pb';
import { JwtAccessTokenGuard } from '../auth/guards/jwt-access.guard';
import { Empty } from './protos/google/protobuf/empty.pb';
import { CreateProductRequestDto } from './dtos/create-product.request.dto';
import { FindManyProductRequestDto } from './dtos/find-many-products.request.dto';
import { ProductResponseDto } from './dtos/product.response.dto';
import { FindManyProductResponseDto } from './dtos/find-many-product.response.dto';

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
  private createProduct(
    @Body() body: CreateProductRequestDto,
  ): Observable<Empty> {
    return this.svc.createProduct(body);
  }

  @Get(':id')
  @UseGuards(JwtAccessTokenGuard)
  private async findById(@Param('id') id: string): Promise<ProductResponseDto> {
    const res = await firstValueFrom(this.svc.findById({ id }));
    return new ProductResponseDto(res.product);
  }

  @Get()
  @UseGuards(JwtAccessTokenGuard)
  private async findMany(
    @Query() query: FindManyProductRequestDto,
  ): Promise<FindManyProductResponseDto> {
    const res = await firstValueFrom(
      this.svc.findMany({
        searchTerm: query.search,
        categoryId: query.categoryId,
        shopId: query.shopId,
        pagination: { page: query.page, perPage: query.perPage },
      }),
    );

    return new FindManyProductResponseDto(res.products, res.pagination);
  }
}
