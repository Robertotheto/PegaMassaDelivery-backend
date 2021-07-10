import { Request, Response } from 'express';
import { IUser } from '../types/user';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import { omit } from 'lodash';

const getUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users: IUser[] = await User.find()
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(404).json({ err: 'Not found' });
  }
}
const createUser = async (req: Request, res: Response): Promise<Response | undefined> => {
  try {
    const { name, email, password } = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already exists!' })
    }
    const user: IUser = new User({
      name,
      email,
      password
    })
    user.password = await user.encryptPassword(user.password);
    const token: string = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET || ' 64f1cbae4a2292801894f90a8f7d0665', {
      subject: user.email,
      expiresIn: 60 * 60 * 24
    });
    const newUser: IUser = await user.save();
    res.status(201).json({ newUser, token });
  } catch (err) {
    return res.status(400).json({ err: 'Registration failed' });
  }
}
const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user: IUser = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Email ou password errado!' })
    }
    const correctPassword: boolean = await user.validatePassword(password)
    if (!correctPassword) {
      return res.status(400).json({ message: 'Password inválido!' })
    }
    const token: string = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET || ' 64f1cbae4a2292801894f90a8f7d0665', {
      subject: user.email,
      expiresIn: 60 * 60 * 24
    });
    const UserAuthenticated = omit(user.toJSON(), 'password');
    return res.status(200).json({ UserAuthenticated, token });
  } catch (err) {
    console.error(err)
    return res.status(400).json({ err: 'Authentic failed' });
  }
}

export { getUser, createUser, loginUser };