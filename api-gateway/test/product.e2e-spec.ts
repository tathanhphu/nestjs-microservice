import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { AppModule } from '../src/app.module';

const PRODUCT = {
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
}

describe('Product e2e', () => {
  let app;
  
  afterAll(async () => {
    console.log(`Connection url ${process.env.MONGO_DB_NEED_TO_DROP}`);
    
    const connection = await mongoose.connect(process.env.MONGO_DB_NEED_TO_DROP, {
      bufferCommands: false
    });

    await mongoose.connection.dropDatabase();
    await connection.disconnect();
  })

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ AppModule ]
    })
    .compile();
    app = moduleFixture.createNestApplication();
    app.init();
  })

  it('/product/ (POST) - should create a product', (done) => {
    request(app.getHttpServer())
      .post('/product/create_product')
      .send(PRODUCT)
      .expect(201)
      .end(done);
  });


})

