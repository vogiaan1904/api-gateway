import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { CreateProductRequest } from '../protos/product.pb';

export class CreateProductRequestDto implements CreateProductRequest {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  stock: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  categoryIds: string[];

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  imageUrls: string[];
}
