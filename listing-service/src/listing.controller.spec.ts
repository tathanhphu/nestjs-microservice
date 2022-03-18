import { Test, } from '@nestjs/testing';
import { IProduct } from './interfaces/product.interface';
import { ListingController } from './listing.controller';
import { IProductSchema } from './schemas/product.schema';
import { ListingService } from './services/listing.service';
import {ModuleMocker, MockFunctionMetadata, fn} from 'jest-mock'
import { ListingModule } from './listing.module';
import { Model } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfigService } from './services/config/mongo-config.service';
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
        size: 'L'
      },
    ],
    id: '6231b8ba71d8693493f0862f',
  },
];
describe('ListingController', () => {
  let listingController: ListingController;
  let listingService: ListingService;

  

  beforeEach(async () => {
    
    const moduleRef = await Test.createTestingModule({
      controllers: [ListingController],
      providers: [ListingService],
      imports: [ListingModule ,
      MongooseModule.forRootAsync({
        useClass: MongoConfigService
      })
      ],

    })
    .useMocker((token) => {
      if (token === 'ProductModel') {
        return {exec: jest.fn().mockResolvedValue(results)};
      }
      if (token === 'LOG_SERVICE') {
        return {};
      }
      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
        const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        return new Mock();
      }
    })
    .compile();

    listingService = moduleRef.get<ListingService>(ListingService);
    listingController = moduleRef.get<ListingController>(ListingController);
  });

  describe('insert product', () => {
    it('should insert a product', async () => {
      let response = await listingController.createProduct(results[0])
      return expect(response.product.name).toBe(results[0].name);  
      
    });
  });

  describe('searchProducts', () => {
    fit('should return an array of products', async () => {
      
      const response = await listingController.searchProducts({});
      console.log(`RESPONSE:` + JSON.stringify(response));
      return expect(response.products.length).toBeGreaterThan(0);
    });
    return;
  });
});
