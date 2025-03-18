import { Observable } from "rxjs";
export declare const protobufPackage = "product";
export interface ProductData {
    id: string;
    name: string;
    sku: string;
    stock: number;
    price: number;
}
export interface CreateProductRequest {
    name: string;
    sku: string;
    stock: number;
    price: number;
}
export interface CreateProductResponse {
    status: number;
    error: string[];
    id: string;
}
export interface FindOneRequest {
    id: string;
}
export interface FindOneResponse {
    status: string;
    error: string[];
    data: ProductData | undefined;
}
export interface FindAllRequest {
    page: number;
    limit: number;
}
export interface FindAllResponse {
    status: number;
    error: string[];
    data: ProductData[];
    total: number;
}
export interface FindByShopRequest {
    shopId: string;
    page: number;
    limit: number;
}
export interface FindByShopResponse {
    status: number;
    error: string[];
    data: ProductData[];
    total: number;
}
export interface UpdateProductRequest {
    id: string;
    name: string;
    sku: string;
    stock: number;
    price: number;
}
export interface UpdateProductResponse {
    status: number;
    error: string[];
}
export interface DeleteProductRequest {
    id: string;
}
export interface DeleteProductResponse {
    status: number;
    error: string[];
}
export interface DecreaseStockRequest {
    id: string;
}
export interface DecreaseStockResponse {
    status: number;
    error: string[];
}
export declare const PRODUCT_PACKAGE_NAME = "product";
export interface ProductServiceClient {
    createProduct(request: CreateProductRequest): Observable<CreateProductResponse>;
    findOne(request: FindOneRequest): Observable<FindOneResponse>;
    decreaseStock(request: DecreaseStockRequest): Observable<DecreaseStockResponse>;
}
export interface ProductServiceController {
    createProduct(request: CreateProductRequest): Promise<CreateProductResponse> | Observable<CreateProductResponse> | CreateProductResponse;
    findOne(request: FindOneRequest): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse;
    decreaseStock(request: DecreaseStockRequest): Promise<DecreaseStockResponse> | Observable<DecreaseStockResponse> | DecreaseStockResponse;
}
export declare function ProductServiceControllerMethods(): (constructor: Function) => void;
export declare const PRODUCT_SERVICE_NAME = "ProductService";
