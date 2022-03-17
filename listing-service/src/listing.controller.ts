import { Controller, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { IProductResponse } from './interfaces/product-create-response';
import { IProductSearchResponse } from './interfaces/product-search-response.interface';
import { IProduct } from './interfaces/product.interface';
import { ListingService } from './services/listing.service';

@Controller()
export class ListingController {
  constructor(
    private readonly listingService: ListingService,
    @Inject('LOG_SERVICE') private readonly logServiceClient: ClientProxy,
  ) {}

  @MessagePattern('create_product')
  public async createProduct(
    product: IProduct,
  ): Promise<IProductResponse> {
    let result: IProductResponse = null;
    try {
      if (product) {
        const createdProduct: IProduct =
          await this.listingService.createProduct(product);
        result = {
          status: HttpStatus.CREATED,
          message: 'create product success',
          product: createdProduct,
        };
        this.logServiceClient.emit(
          'log_message',
          `create product success, productId: ${createdProduct.id}`,
        );
      } else {
        result = {
          status: HttpStatus.PRECONDITION_FAILED,
          message: 'create product precondition failed',
        };
        this.logServiceClient.emit(
          'log_message',
          `create product precondition failed`,
        );
      }
    } catch (err) {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'create product bad request',
        errors: err.errors,
      };
      this.logServiceClient.emit(
        'log_message',
        `${err.errors}`,
      );
    }
    return result;
  }

  @MessagePattern('search_products')
  public async searchProducts(criteria: any): Promise<IProductSearchResponse> {
    try {
      console.log(`${JSON.stringify(criteria)}`);
      if (!criteria) {
        throw new Error('search body is empty')
      }
      const products = await this.listingService.searchProducts(criteria);
      return {
        status: HttpStatus.OK,
        products
      }  
    } catch (err) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'search product bad request',
        errors: err.errors
      }
    }
  }

  @MessagePattern('get_product_by_id')
  public async getProductById(id: string): Promise<IProductResponse> {
    let result: IProductResponse;

    if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
      const product = await this.listingService.searchProductById(id);
      if (product) {
        result = {
          status: HttpStatus.OK,
          message: 'get_product_by_id_success',
          product,
        };
      } else {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'get_product_by_id_not_found',
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'get_product_by_id_bad_request',
      };
    }

    return result;
  }
}
