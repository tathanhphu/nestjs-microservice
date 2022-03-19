import { IProduct } from './product.interface';
import { IBaseResponse } from './base-response.interface';
export interface IProductResponse extends IBaseResponse {
  product?: IProduct;
}
