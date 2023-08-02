import express from 'express';
import { dbInit } from './db/Sequelize.js';
import { UserRouter } from './Routes/User/index.js';
import morgan from 'morgan';
import auth from './auth/auth.js';
import cors from 'cors';
import { RaspberryRouter } from './Routes/Raspberry/index.js';
import { StatsRouter } from './Routes/Stats/index.js';

const PORT = process.env.PORT || 9000;

const app = express();

app.use(
  cors({
    origin: '*',
  })
);

app
  .use(express.json())
  .use('/stats_pdf', express.static('./stats_pdf'))
  .use(morgan('dev'));
dbInit();

dbInit();

app.use('/user', UserRouter);
app.use('/raspberry', RaspberryRouter);
app.use('/stats', StatsRouter);
app.listen(PORT, () => {
  console.log(`Notre serveur tourne sur le port ${PORT}`);
});
