import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './routes/index';

const app: Express = express();
app.use(express.json());
app.use(cors());
app.use('/auth', User);
const port: string | number = process.env.PORT || 3000;


const uri: string = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.q7vsv.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)
mongoose.set('useCreateIndex', true);

mongoose.connect(uri, options)
  .then(() => app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`)
  )
  ).catch(err => {
    throw err;
  })
