import { Test } from '@nestjs/testing';
import { ListingController } from './product.controller';
import { ProductService } from './services/product.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { getModelToken } from '@nestjs/mongoose';
const moduleMocker = new ModuleMocker(global);

const results: any[] = [
  {
    name: 'Gucci bag',
    description: 'desc',
    brand: 'Gucci',
    price: 434234,
    variant: [
      {
        color: 'black',
        image: 'black.png',
        size: 'XL',
      },
      {
        color: 'white',
        image: 'white.png',
        size: 'L',
      },
    ],
    id: '6231b8ba71d8693493f0862f',
  },
];
class FakeProductModel {
  static find() {
    return {
      exec: () => {
        return results;
      },
    };
  }
  save = () => {
    return results[0];
  };
}

describe('ListingController', () => {
  let productController: ListingController;
  //let productService: ProductService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ListingController],
      providers: [
        ProductService,
        {
          provide: getModelToken('Product'),
          useValue: FakeProductModel,
        },
      ],
      imports: [],
    })
      .useMocker((token) => {
        if (token === 'LOG_SERVICE') {
          return {
            emit: jest.fn().mockResolvedValue({}),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    //productService = moduleRef.get<ProductService>(ProductService);
    productController = moduleRef.get<ListingController>(ListingController);
  });

  describe('insert a product', () => {
    it('should insert a product', async () => {
      const response = await productController.createProduct(results[0]);
      return expect(response.product.name).toBe(results[0].name);
    });
  });

  describe('searchProducts', () => {
    it('should return an array of products', async () => {
      const response = await productController.searchProducts({});
      await expect(response.products).toHaveLength(1);
    });
    return;
  });

});
