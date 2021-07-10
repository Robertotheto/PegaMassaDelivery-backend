import { IOrder } from '../types/order'

import { model, Schema } from 'mongoose';
import userModel from './userModel';

const orderSchema: Schema<IOrder> = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 4,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    telefone: {
      type: Number,
      required: true,
    },
    rua: {
      type: String,
      required: true,
    },
    numero: {
      type: Number,
      required: true,
    },
    bairro: {
      type: String,
      required: true,
    },
    cidade: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      required: true,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        flavor: { type: String, required: true },
        amount: { type: Number, required: true },
        price: { type: Number, required: true }
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  { timestamps: true }
)
export default model<IOrder>("Order", orderSchema);