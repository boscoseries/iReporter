import express from 'express';
import * as User from '../controllers/userController';
import * as auth from '../middlewares/auth';

const router = express.Router();

router.get('/users', User.getAll); //auth.authentication,
router.post('/signup', User.createUser); //auth.authentication,
router.post('/login', User.login); // auth.authentication, , User.login
router.delete('/users', User.deleteUser); // auth.authentication, , User.login



export default router;