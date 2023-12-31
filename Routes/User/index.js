import { Router } from 'express';
import auth from '../../auth/auth.js';
import { LoginHandler, changeNumber, printStatsFile } from './functions.js';


export const UserRouter = Router();

UserRouter.post('/login', LoginHandler);

UserRouter.use(auth);

UserRouter.post('/statsFile',printStatsFile)
UserRouter.post('/changeNumber', changeNumber)
// UserRouter.route('/').get(getAllUsers).post(createUser);
// UserRouter.route('/:id').delete(deleteUser).put(updateUser).get(getUser);
