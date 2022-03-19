import { IProduct } from "./product.interface";
import { IBaseResponse } from "./base-response.interface";
export interface IProductSearchResponse extends IBaseResponse {
  products?: IProduct[],
}