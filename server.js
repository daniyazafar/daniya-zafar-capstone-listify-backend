import express from 'express';
import 'dotenv/config';

const app = express();

const { PORT } = process.env;

app.use('/', (_req, res) => {
    res.send('Welcome to the backend!')
})

app.listen (PORT, () => {
    console.log('Listening to port: ', PORT)
})