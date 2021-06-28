import { Router } from 'express';
import { tokenValidation } from '../libs/verifyToken';
import { createOrder, deleteOrder, getOrder, getOrderOne, updateOrder } from '../controllers/OrderController';

const OrderRouter: Router = Router();

OrderRouter.get('/order/list', tokenValidation, getOrder);
OrderRouter.get('/order/listOne/:_id', tokenValidation, getOrderOne);
OrderRouter.post('/order/create', tokenValidation, createOrder);
OrderRouter.put('/order/update/:_id', tokenValidation, updateOrder);
OrderRouter.delete('/order/delete/:_id', tokenValidation, deleteOrder);

export { OrderRouter }