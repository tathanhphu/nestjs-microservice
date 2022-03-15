import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { IProductCreateResponse } from './interfaces/product-create-response';
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
  ): Promise<IProductCreateResponse> {
    let result: IProductCreateResponse = null;
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
}
