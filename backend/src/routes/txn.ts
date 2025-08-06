import express from 'express'
import { TransactionFun } from '../controllers/transaction';
const router = express.Router();

router.post('/sign',TransactionFun);

export default router;