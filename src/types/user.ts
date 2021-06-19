import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  validatePassword(password: string): Promise<boolean>;
  encryptPassword(password: string): Promise<string>;
}