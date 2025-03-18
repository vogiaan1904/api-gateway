import { Observable } from "rxjs";
export declare const protobufPackage = "order";
export interface OrderData {
    id: string;
    productId: number;
    quantity: number;
    userId: string;
}
export interface CreateOrderRequest {
    productId: number;
    quantity: number;
    userId: string;
}
export interface CreateOrderResponse {
    status: number;
    error: string[];
    id: string;
}
export interface FindOneRequest {
    id: string;
}
export interface FindOneResponse {
    status: number;
    error: string[];
    data: OrderData | undefined;
}
export declare const ORDER_PACKAGE_NAME = "order";
export interface OrderServiceClient {
    createOrder(request: CreateOrderRequest): Observable<CreateOrderResponse>;
    findOne(request: FindOneRequest): Observable<FindOneResponse>;
}
export interface OrderServiceController {
    createOrder(request: CreateOrderRequest): Promise<CreateOrderResponse> | Observable<CreateOrderResponse> | CreateOrderResponse;
    findOne(request: FindOneRequest): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse;
}
export declare function OrderServiceControllerMethods(): (constructor: Function) => void;
export declare const ORDER_SERVICE_NAME = "OrderService";
