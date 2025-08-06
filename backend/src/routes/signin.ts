import express from 'express'
import { userSignin } from '../controllers/userSignin';

const router = express.Router();

router.post('/',userSignin);

export default router;