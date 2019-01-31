import express from 'express';
import * as User from '../controllers/userController';
import * as auth from '../middlewares/auth';

const router = express.Router();

router.get('/users', auth.adminAuthentication, User.getAll);
router.post('/signup', User.createUser);
router.post('/login', auth.authentication, User.login);
router.delete('/users', auth.authentication, auth.adminAuthentication, User.deleteUser);



export default router;