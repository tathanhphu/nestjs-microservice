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
    //@Inject('LISTING_SERVICE') private readonly listingServiceClient: ClientProxy,
    @Inject('LOG_SERVICE') private readonly logServiceClient: ClientProxy,
  ) {
    
  }

  @Get()
  public async getProducts() {
    //console.log(`this.logServiceClient: ${this.logServiceClient}`);
    let response = {}//await firstValueFrom(
      this.logServiceClient.emit('log_message', 'message from getProducts')
    //);
    return 'products ' + JSON.stringify(response);
  }
}
