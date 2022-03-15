import {
  Controller,
  Inject,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { ClientProxy } from '@nestjs/microservices';

@Controller('listing')
export class ListingController {
  constructor(
    @Inject('LISTING_SERVICE') private readonly listingServiceClient: ClientProxy,
    @Inject('LOG_SERVICE') private readonly logServiceClient: ClientProxy,
  ) {
    
  }

  @Post('/create_product')
  public async createProduct(
    @Body() product: any
  ) {
    
    //console.log(`this.logServiceClient: ${this.logServiceClient}`);
    let response = await firstValueFrom(
      this.listingServiceClient.send('create_product', product)
    );
    return response
  }
}
