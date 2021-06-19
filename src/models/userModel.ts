import { IUser } from '../types/user';
import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 4,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    }
  },
  { timestamps: true }
)
userSchema.methods.encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};
export default model<IUser>("User", userSchema);