import { Document } from 'mongoose';
import { IUser } from './user';

interface IOrderQuantity {
  name: string;
  amount: number;
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
  orderItems: Array<IOrderQuantity>;
  user: IUser['_id'];
}