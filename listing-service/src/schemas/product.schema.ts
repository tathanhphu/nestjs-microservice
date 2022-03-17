import * as mongoose from 'mongoose';
 
function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id;
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
    variant:[{
      color: String,
      image: String,
      size: String,
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
