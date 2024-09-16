import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import listRouter from './routes/lists.js'

const app = express();

const { PORT, CORS_ORIGIN } = process.env;

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json()); 

app.get('/', (_req, res) => {
    res.send('Welcome to the backend!')
})

app.use('/lists', listRouter);

app.listen (PORT, () => {
    console.log('Listening to port: ', PORT)
})