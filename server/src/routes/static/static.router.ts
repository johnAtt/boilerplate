import { Router } from 'express';
import * as express from 'express';
import * as path from 'path';
import { StaticCtrl } from './static.ctrl';

const StaticRouter = Router();

StaticRouter.get('/', StaticCtrl.handleRoot);
StaticRouter.use(express.static(path.join(__dirname, '../../client/dist/')));

export { StaticRouter };
