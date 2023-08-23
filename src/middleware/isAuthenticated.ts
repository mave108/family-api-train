import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import CustomError from '../utils/Error';
import { CustomRequest, Response, NextFunction, Token } from '../utils/http';

dotenv.config();
export default (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  const error = new CustomError('Not authenticated.');
  if (!authHeader) {
    return error
      .setStatusCode(401)
      .throw();
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, String(process.env.PW_ENCRYPTION_SECRET)) as Token;
    console.log("decodedToken", decodedToken)
  } catch (err) {
    console.log("catch", err);
    return error.setStatusCode(500).throw();
  }
  if (!decodedToken) {
    return error.setStatusCode(401).throw();
  }
  req.userId = decodedToken.id;
  next();
};
