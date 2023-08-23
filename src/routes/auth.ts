// const authController = require('../controllers/auth');
import express from 'express';
import { body } from 'express-validator';
import { login, signup } from '../controllers/auth';
import { PrismaClient } from '@prisma/client'
import CustomError from '../utils/Error';
const prisma = new PrismaClient();

const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .notEmpty()
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom(async value => {
        const user = await prisma.users.findUnique({
          select: {
            email: true,
          },
          where: {
            email: value
          }
        });
        if (user) {
          return new CustomError('E-mail already in use')
            .setStatusCode(400)
            .throw();
        }
      }).normalizeEmail(),
    body('password')
      .notEmpty()
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
  .isLength({ min: 5 })
]
  , login);

export default router;

