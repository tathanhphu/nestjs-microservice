import { Document } from 'mongoose';

export interface IUserExperience extends Document {
  id?: string;
  action: string;
  action_param: string;
}