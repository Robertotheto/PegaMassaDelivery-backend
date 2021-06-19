import { Router } from 'express';
import { tokenValidation } from '../libs/verifyToken';
import { createUser, getUser, loginUser, profile } from '../controllers/index';

const router: Router = Router();

router.get('/users/list', getUser);
router.get('/users/profile', tokenValidation, profile)
router.post('/users/register', createUser);
router.post('/users/login', loginUser);

export default router;