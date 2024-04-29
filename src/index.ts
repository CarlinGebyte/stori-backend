import './libs/db.js';
import cors from 'cors';
import express from 'express';
import newsletterRouter from './routes/Newsletter.route.js';

const app = express();
const PORT = 3000;

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
