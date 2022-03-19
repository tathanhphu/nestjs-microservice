import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';
import { Transport, TcpOptions } from '@nestjs/microservices';

import { ConfigService } from './services/config/config.service';

async function bootstrap() {
  const port: number = new ConfigService().get('port');
  const app = await NestFactory.createMicroservice(ProductModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port,
    },
  } as TcpOptions);
  await app.listen();
  console.log(`[Product service] listenning on port ${port} ...`);
}
bootstrap();
