// const authController = require('../controllers/auth');
import express from 'express';
import {body} from 'express-validator';
import {login,signup} from '../controllers/auth';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.'),
    body('password')
      .trim()
      .isLength({ min: 5 }),
    body('first_name')
      .trim()
      .not()
      .isEmpty(),
      body('last_name')
      .trim()
      .not()
      .isEmpty()
  ],
  signup
);

router.post('/login', login);

export default router;
