import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { IProduct } from 'src/interfaces/product.interface';
@Injectable()
export class ListingService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<IProduct>
  ) {}

  public async createProduct(product: IProduct): Promise<IProduct> {
    const productModel = new this.productModel(product);
    return await productModel.save();
  }
  
}
