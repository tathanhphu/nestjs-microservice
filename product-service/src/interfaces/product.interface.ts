import { Document } from 'mongoose';
import { ProductVariant } from './product-variant.interface';

export interface IProduct extends Document {
  id?: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  variant: ProductVariant[];
}
