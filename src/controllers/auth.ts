import {validationResult} from 'express-validator';
import {Request, Response, NextFunction} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
import {sendHttpResponse} from '../utils/http';

const prisma = new PrismaClient();

export const signup = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(sendHttpResponse(false,errors))
  }
  const {email,password} = req.body;
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      return prisma.user.create({
        data: {
          email,
          password: hashedPw,
        }
      })
    })
    .then(result => {
      res.status(201).json({ message: 'User created!' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(sendHttpResponse(false,{ error: 'Email or password is invalid'}));
  }

  const {email,password} = req.body;
  const user = await prisma.user.findFirst({
    select:{
    password: true,
    uid: true,
    email: true
  },
  where: {
    email
  }
});
if (!user?.password){
  res.status(400).json(sendHttpResponse(false,{ error: 'Email or password is invalid'}));
}
if (user?.password){
  const isAuthenticated = await bcrypt.compare(password,user?.password);
  if(!isAuthenticated){
    res.status(400).json(sendHttpResponse(false,{ error: 'Email or password is invalid'}))
  }
  const token = jwt.sign(
        {
          email: user.email,
          uid: user.uid 
        },
        String(process.env.PW_ENCRYPTION_SECRET),
        { expiresIn: '1h' }
      );
    res.status(201).json(sendHttpResponse<object>(true,null,{
      uid: user.uid,
      token
    }))
}
    next();
  // User.findOne({ email: email })
    // .then(user => {
      // if (!user) {
        // const error = new Error('A user with this email could not be found.');
        // error.statusCode = 401;
        // throw error;
      // }
      // loadedUser = user;
      // return bcrypt.compare(password, user.password);
    // })
    // .then(isEqual => {
      // if (!isEqual) {
        // const error = new Error('Wrong password!');
        // error.statusCode = 401;
        // throw error;
      // }
    //   const token = jwt.sign(
    //     {
    //       email: loadedUser.email,
    //       userId: loadedUser._id.toString()
    //     },
    //     'somesupersecretsecret',
    //     { expiresIn: '1h' }
    //   );
    //   res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    // })
    // .catch(err => {
    //   if (!err.statusCode) {
    //     err.statusCode = 500;
    //   }
    //   next(err);
    // });
};
