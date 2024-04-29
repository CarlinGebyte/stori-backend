import mongoose from 'mongoose';
import { config } from './config.js';

const connect = async () => {
  try {
    await mongoose.connect(config.env.MONGO_URI);
  } catch (error) {
    console.log('DB Connection Error');
  }
};

connect();
