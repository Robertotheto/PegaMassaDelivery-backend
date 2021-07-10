import { Document } from 'mongoose';
import { IUser } from './user';

interface IOrderDescriptions {
  name: string;
  flavor: string;
  amount: number;
  price: number;
}

export interface IOrder extends Document {
  name: string;
  email: string;
  telefone: number;
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
  orderItems: Array<IOrderDescriptions>;
  user: IUser['id'];
}