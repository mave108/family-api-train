import express from 'express';
import { getMembers } from '../controllers/Members';

const router = express.Router();

router.get('/',getMembers);
export default router;