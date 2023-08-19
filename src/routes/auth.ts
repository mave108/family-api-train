// const authController = require('../controllers/auth');
import express from 'express';
import {body} from 'express-validator';
import {login,signup } from '../controllers/auth';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom( async value => {
        const user = await prisma.user.findUnique({
          select: {
            email: true,
          },
          where: {
            email: value
          }
        });
        if (user) {
          throw new Error('E-mail already in use');
        }
      } ).normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
  ],
  signup
);

router.post('/login', [body('email')
.notEmpty()
.isEmail()
.withMessage('Please enter valid email address')
.escape(),
body('password')
.notEmpty()
.trim()
.isLength({min: 5})
]
,login);

export default router;

