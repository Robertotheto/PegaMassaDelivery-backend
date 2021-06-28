import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IPayload } from '../types/payload'

export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json('Access Denied');

    const payload = jwt.verify(token, process.env.TOKEN_SECRET || ' 64f1cbae4a2292801894f90a8f7d0665') as IPayload;
    req.userId = payload._id
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
}