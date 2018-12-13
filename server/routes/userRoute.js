import express from 'express';
import * as User from '../controllers/userController';

const router = express.Router();


router.post('/signup', User.create);
//router.post('/login', User.login);


export default router;