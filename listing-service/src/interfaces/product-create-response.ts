import { IProduct } from "./product.interface";

export interface IProductCreateResponse {
  status: number;
  message: string;
  product?: IProduct,
  errors?: {
    [key: string]: any 
  }
}