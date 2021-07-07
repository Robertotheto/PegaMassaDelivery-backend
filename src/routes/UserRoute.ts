import { Router } from 'express';

import { createUser, getUser, loginUser } from '../controllers/UserController';

const UserRouter: Router = Router();

UserRouter.get('/users/list', getUser);
UserRouter.post('/users/register', createUser);
UserRouter.post('/users/login', loginUser);

export { UserRouter };