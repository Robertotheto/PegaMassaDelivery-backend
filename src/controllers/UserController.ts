import { Request, Response } from 'express';
import { IUser } from '../types/user';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';

const getUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users: IUser[] = await User.find()
    return res.status(200).json({ users });
  } catch (error) {
    throw error;
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
    const newUser: IUser = await user.save();
    const token: string = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET || ' 64f1cbae4a2292801894f90a8f7d0665');
    res.header('auth-token', token).status(201).json({ message: "User create", user: newUser });
  } catch (err) {
    return res.status(400).json({ err: 'Registration failed' });
  }
}
const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Email ou password errado!' })
    }
    const correctPassword: boolean = await user.validatePassword(password)
    if (!correctPassword) {
      return res.status(400).json({ message: 'Password inválido!' })
    }
    const token: string = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET || ' 64f1cbae4a2292801894f90a8f7d0665', {
      expiresIn: 60 * 60 * 24
    });

    return res.header('auth-token', token).status(200).json(user);
  } catch (err) {
    return res.status(400).json({ err: 'Authentic failed' });
  }
}

export { getUser, createUser, loginUser };