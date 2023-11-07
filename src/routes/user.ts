import { Router } from 'express';
import createUser from '../controllers/users/create';
import readUser from '../controllers/users/read';
import updateUser from '../controllers/users/update';
import deleteUser from '../controllers/users/delete';
import validateSchema from '../middlewares/validator';
import registerSchema from '../schemas/user.schema';

const router = Router();

router.get('/', readUser);
router.post('/', validateSchema(registerSchema), createUser);
router.put('/', validateSchema(registerSchema), updateUser);
router.delete('/', deleteUser);

export default router;
