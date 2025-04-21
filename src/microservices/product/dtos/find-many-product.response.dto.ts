import { PaginationResponse, ProductData } from '../protos/product.pb';
import { ProductResponseDto } from './product.response.dto';

class PaginationResponseDto implements PaginationResponse {
  total: number;
  totalPage: number;
  currentPage: number;
  perPage: number;
  next: number;
  prev: number;

  constructor(pagination: Partial<PaginationResponse> = {}) {
    this.total = pagination.total ?? 0;
    this.totalPage = pagination.totalPage ?? 0;
    this.currentPage = pagination.currentPage ?? 0;
    this.perPage = pagination.perPage ?? 0;
    this.next = pagination.next ?? null;
    this.prev = pagination.prev ?? null;
  }
}

export class FindManyProductResponseDto {
  items: ProductResponseDto[];
  pagination: PaginationResponseDto;

  constructor(
    items: Partial<ProductData>[],
    pagination: Partial<PaginationResponse>,
  ) {
    this.items = items.map((item) => new ProductResponseDto(item));
    this.pagination = new PaginationResponseDto(pagination);
  }
}
