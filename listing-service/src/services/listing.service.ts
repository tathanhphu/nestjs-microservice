import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IProduct } from '../interfaces/product.interface';
import { QUERY_FIELD, SEARCH_PARAM } from 'src/interfaces/query.interface';

// const conditions = { and: '$and', or: '$or' };
// const operators = {
//   '=': '$eq',
//   '!=': '$ne',
//   '<': '$lt',
//   '<=': '$lte',
//   '>': '$gt',
//   '>=': '$gte',
// };

// const mapRule = (rule) => ({
//   [operators[rule.operator]]: ['$' + rule.field, rule.value],
// });

// const mapRuleSet = (ruleSet) => {
//   return {
//     [conditions[ruleSet.condition]]: ruleSet.rules.map((rule) =>
//       rule.operator ? mapRule(rule) : mapRuleSet(rule),
//     ),
//   };
// };

@Injectable()
export class ListingService {
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

  public async searchProducts(searchParam: SEARCH_PARAM | any): Promise<IProduct[]> {
    let value: any = {};
    let q: any = {};
    if (searchParam?.operator) {
      switch(searchParam.operator) {
        case 'like': 
          value = new RegExp(searchParam.value);
          break;
        case 'ilike': 
          value = new RegExp(searchParam.value, 'ig');
          break;
        default:
          value = searchParam.value;
          break;
  
      }  
    }
    
    q[searchParam.field] = value;
    return this.productModel.find(q).exec();
  }


}
