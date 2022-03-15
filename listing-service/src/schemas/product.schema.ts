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
    price: {
      type: Number,
      required: [true, 'Price can not be empty']
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
