import { CategoryData, ImageData, ProductData } from '../protos/product.pb';

export class ProductResponseDto implements ProductData {
  id: string;
  name: string;
  sku: string;
  stock: number;
  description: string;
  price: number;
  active: boolean;
  categories: CategoryData[] = [];
  images: ImageData[] = [];

  constructor(data: Partial<ProductData> = {}) {
    this.id = data.id ?? '';
    this.name = data.name ?? '';
    this.sku = data.sku ?? '';
    this.stock = data.stock ?? 0;
    this.description = data.description ?? '';
    this.price = data.price ?? 0;
    this.active = data.active ?? false;
    this.categories = Array.isArray(data.categories) ? data.categories : [];
    this.images = Array.isArray(data.images) ? data.images : [];
  }
}
