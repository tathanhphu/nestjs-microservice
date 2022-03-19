import {
  Controller,
  Inject,
  Get,
  Post,
  Param,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { ClientProxy } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
  constructor(
    @Inject('PRODUCT_SERVICE')
    private readonly listingServiceClient: ClientProxy,
    @Inject('LOG_SERVICE') private readonly logServiceClient: ClientProxy,
  ) {}

  @Post('/create_product')
  public async createProduct(@Body() product: any) {
    const response = await firstValueFrom(
      this.listingServiceClient.send('create_product', product),
    );
    if (response.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: response.message,
          errors: response.errors,
        },
        response.status,
      );
    }
    return {
      product: response.product,
      message: response.message,
    };
  }

  @Post('/search_products')
  @HttpCode(HttpStatus.OK)
  public async searchProducts(@Body() criteria: any) {
    const response = await firstValueFrom(
      this.listingServiceClient.send('search_products', criteria),
    );

    if (response.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: response.message,
          errors: response.errors,
        },
        response.status,
      );
    }
    return {
      products: response.products,
      message: response.message,
    };
  }

  @Get('/product/:id')
  public async getProductById(@Param() params) {
    const response = await firstValueFrom(
      this.listingServiceClient.send('get_product_by_id', params.id),
    );
    if (response.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: response.message,
          errors: response.errors,
        },
        response.status,
      );
    }
    return {
      product: response.product,
      message: response.message,
    };
  }
}
