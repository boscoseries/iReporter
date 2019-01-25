import express from 'express';
import * as User from '../controllers/userController';
import * as auth from '../middlewares/auth';

const router = express.Router();

router.get('/users', User.getAll); //auth.authentication, auth.adminAuthentication, 
router.post('/signup', User.createUser); //auth.authentication,
router.post('/login', User.login); //  auth.authentication, 
router.delete('/users', User.deleteUser); // auth.authentication, auth.adminAuthentication, 



export default router;