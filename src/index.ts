import './libs/db.js';
import cors from 'cors';
import express from 'express';
import { config } from './libs/config.js';
import newsletterRouter from './routes/Newsletter.route.js';

const app = express();
const PORT = config.env.PORT ?? 3000;

app.use(express.json());

app.use(
  cors({
    credentials: true
  })
);

app.use('/api/v1/newsletters', newsletterRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
