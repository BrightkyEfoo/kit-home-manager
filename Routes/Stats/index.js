import { Router } from 'express';
import auth from '../../auth/auth.js';
import { getStats, pushStat } from './function.js';


export const StatsRouter = Router();

StatsRouter.post('/pushStats', pushStat);

StatsRouter.use(auth);

StatsRouter.post('/',getStats)