import chalk from 'chalk';
import cors from 'cors';
import express, { json } from 'express';
import { signRouter } from './routes/sign-router.js';
import { tweetsRouter } from './routes/tweets-router.js';

const app = express();

app.use(cors());
app.use(json());

app.use('/sign-up', new signRouter);
app.use('/tweets', new tweetsRouter);

app.listen(5001, () => {
  console.log(chalk.bold.blue('Servidor funfando de boas!!!'));
});
