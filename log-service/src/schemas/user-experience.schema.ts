import * as mongoose from 'mongoose';

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id;
}


export const UserExperienceSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: [true, `User's action can not be empty`],
    },
    action_param: {
      type: String,
      required: [true, `User's action param can not be empty`],
    },
    created_at:{ type: Date, default: Date.now },
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
