import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IProduct } from '../interfaces/product.interface';

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

  public async searchProducts(q: string): Promise<IProduct[]> {
    // return this.productModel.find(criteria).exec();
    // let mongoDbQuery = { $expr: mapRuleSet(criteria) };
    // console.log(`${JSON.stringify(mongoDbQuery)}`);
    // let mongoDbQuery = {
    //   'name': new RegExp('phu'), 
    //   'price': {
    //     '$gt': 0
    //   }, 
    //   'colour': {
    //     '$elemMatch': {
    //       'name': new RegExp('white')
    //     }
    //   }
    // }

    //==
    // {
    //   '$or': [
    //     {
    //       'name': new RegExp('gu', 'i')
    //     }, {
    //       'brand': new RegExp('dsdas')
    //     }
    //   ]
    // }
    let mongoDbQuery: any = {};
    // if (q.name) {
    //   mongoDbQuery = {
    //     name: new RegExp(q.name, 'i')
    //   }
    // }
    // if (q.priceRange) {
    //   mongoDbQuery.price = {
    //     '$gte': q.priceRange.min || 0,
    //     '$lte': q.priceRange.max
    //   }
    // }
    // if (q.brand) {
    //   mongoDbQuery.brand = {
    //     '$in': [q.brand]
    //   }
    // }
    // if (q.colour) {
    //   mongoDbQuery.colour = {
    //     '$elemMatch': {
    //       'name': new RegExp(mongoDbQuery.colour)
    //      }
    //   }
    // }
    const qeury = {
      '$and': [
        {
          'name': new RegExp('gu', 'i')
        }, {
          'brand': new RegExp('gu', 'i')
        }
      ]
    }
    console.log(`${q}`);
    return this.productModel.find({q}).exec();
  }
}
