import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class FindManyProductRequestDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  perPage?: number;

  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  shopId?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;
}
