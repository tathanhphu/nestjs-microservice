import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IProduct } from '../interfaces/product.interface';
import { SEARCH_PARAM } from 'src/interfaces/query.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<IProduct>,
  ) {}

  public async createProduct(product: IProduct): Promise<IProduct> {
    const productModel = new this.productModel(product);
    return await productModel.save();
  }

  public async searchProductById(id: string): Promise<IProduct> {
    return this.productModel.findById(id).exec();
  }

  public async searchProducts(searchParam: SEARCH_PARAM): Promise<IProduct[]> {
    const q: any = {};
    q[searchParam.field] = this.buildQuery(searchParam);;
    const sortBy = this.buildOrderBy(searchParam);
    return this.productModel.find(q).sort(sortBy).exec();
  }

  private buildQuery(searchParam: SEARCH_PARAM) {
    let value: any = {};
    if (searchParam?.operator) {
      switch (searchParam.operator) {
        case 'like':
          value = new RegExp(searchParam.value);
          break;
        case 'ilike':
          value = new RegExp(searchParam.value, 'ig');
          break;
        case '>':
          value = {
            $gt: +searchParam.value,
          };
          break;
        case '>=':
          value = {
            $gte: +searchParam.value,
          };
          break;
        case '<':
          value = {
            $lt: +searchParam.value,
          };
          break;
        case '<=':
          value = {
            $lte: +searchParam.value,
          };
          break;
        case 'range':
          value = {
            $lte: +searchParam.value.max,
            $gte: +searchParam.value.min
          }
          break;
        default:
          value = searchParam.value;
          break;
      }
      return value;
    }
  }

  private buildOrderBy(searchParam: SEARCH_PARAM) {
    let sort: any = {}
    if (searchParam.sortBy) {
      sort[searchParam.sortBy.field] = searchParam.sortBy.order === 'desc' ? -1 : 1;
      return sort;
    }
    return null;
  }
}
