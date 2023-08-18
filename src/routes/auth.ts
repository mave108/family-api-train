// const authController = require('../controllers/auth');
import express from 'express';
import {body} from 'express-validator';
import {login,signup} from '../controllers/auth';

const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      // .custom((value, { req }) => {
      //   return User.findOne({ email: value }).then(userDoc => {
      //     if (userDoc) {
      //       return Promise.reject('E-Mail address already exists!');
      //     }
      //   });
      // })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
    body('name')
      .trim()
      .not()
      .isEmpty()
  ],
  signup
);

router.post('/login', login);

export default router;
