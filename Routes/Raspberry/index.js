import { Router } from 'express';
import auth from '../../auth/auth.js';
import { verifyOwning } from './middleware.js';
import { changePIByRaspberry, changeStateByRaspberry, changeStateByUser, getRaspberryInfos, getState, getStateR } from './functions.js';


export const RaspberryRouter = Router();

RaspberryRouter.post('/infos',getRaspberryInfos)
RaspberryRouter.post('/stateR',changeStateByRaspberry)
RaspberryRouter.post('/stateRP',changePIByRaspberry)

RaspberryRouter.post('/stateRget', getStateR)



RaspberryRouter.use(auth)
RaspberryRouter.post('/stateget', getState)

RaspberryRouter.use(verifyOwning);
RaspberryRouter.post('/state',changeStateByUser);

