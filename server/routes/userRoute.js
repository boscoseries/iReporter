import express from 'express';
import * as User from '../controllers/userController';
import * as auth from '../middlewares/auth';

const router = express.Router();

router.post('/signup', User.create); //auth.authentication,
router.post('/login', User.login); // auth.authentication, , User.login



export default router;