import express from 'express';
import * as User from '../controllers/userController';
import * as auth from '../middlewares/auth';

const router = express.Router();

router.get('/users', auth.adminAuthentication, User.getAll); //
router.post('/signup', User.createUser); //auth.authentication,
router.post('/login', auth.authentication, User.login); //  User.login
router.delete('/users', auth.authentication, User.deleteUser); // auth.authentication, , User.login



export default router;