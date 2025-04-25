import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Query,
  Sse,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtAccessTokenGuard } from '../auth/guards/jwt-access.guard';
import { CreateProductRequestDto } from './dtos/create-product.request.dto';
import { FindManyProductResponseDto } from './dtos/find-many-product.response.dto';
import { FindManyProductRequestDto } from './dtos/find-many-products.request.dto';
import { ProductResponseDto } from './dtos/product.response.dto';
import { Empty } from './protos/google/protobuf/empty.pb';
import {
  PRODUCT_SERVICE_NAME,
  ProductServiceClient,
} from './protos/product.pb';

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

  @Sse('stream-demo')
  streamProducts(): Observable<{ data: any }> {
    const empty = {};

    try {
      const stream = this.svc.list(empty);
      return stream.pipe(
        map((product) => {
          return {
            data: new ProductResponseDto(product),
          };
        }),
      );
    } catch (error) {
      throw error;
    }
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
