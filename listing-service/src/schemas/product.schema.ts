import * as mongoose from 'mongoose';
 
function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id;
}

export interface IProductSchema extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  colour: [{
    name: string,
    image: string,
  }],
  created_at: Date,
  updated_at: Date,
}

export const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name can not be empty'],
    },
    description: {
      type: String
    },
    brand: {
      type: String,
      required: [true, 'Brand cannot be empty']
    },
    price: {
      type: Number,
      required: [true, 'Price cannot be empty']
    },
    colour:[{
      name: String,
      image: String
    }],
    created_at:{ type: Date },
    updated_at:{ type: Date, default: Date.now },
  },
  {
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
  },
);
