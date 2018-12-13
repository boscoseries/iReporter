import express from 'express';
import * as User from '../controllers/userController';
import * as auth from '../middlewares/auth';

const router = express.Router();


router.post('/signup', User.create);
router.post('/login', User.create);

// router.post('/signup', auth.authentication, User.create);
// router.post('/login', auth.authentication, User.create);



export default router;