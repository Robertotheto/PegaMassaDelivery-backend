import { Request, Response } from 'express';
import { IOrder } from '../types/order';
import Order from '../models/orderModel';

const getOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const orders: IOrder[] = await Order.find().populate({ path: 'user', select: ['name', 'email'] }).exec();
    return res.status(200).json(orders);
  } catch (error) {
    throw error;
  }
}
const getOrderOne = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { _id } = req.params
    const order: IOrder = await Order.findOne({ _id })
    return res.json(order);
  } catch (error) {
    return res.status(400).json(error);
  }
}
const createOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { user_id } = req;
    const { name, email, telefone, rua, numero, bairro, cidade, estado, orderItems } = req.body;

    const order: IOrder = new Order({
      name,
      email,
      telefone,
      rua,
      numero,
      bairro,
      cidade,
      estado,
      orderItems,
      user: user_id
    });
    const newOrder: IOrder = await order.save();
    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(400).json(error);
  }
}
const updateOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { _id } = req.params;

    const updateOrder: IOrder = await Order.findOneAndUpdate({
      _id
    }, req.body, { new: true })
    return res.json(updateOrder);
  } catch (error) {
    return res.status(400).json(error);
  }
}
const deleteOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { _id } = req.params;
    await Order.findOneAndDelete({ _id });
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json(error);
  }
}

export { getOrder, createOrder, getOrderOne, updateOrder, deleteOrder };