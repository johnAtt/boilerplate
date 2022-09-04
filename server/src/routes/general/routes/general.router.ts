import { Router } from 'express';
import { generalCtrl } from './general.ctrl';

export const GeneralRouter = Router();

GeneralRouter.route('/version')
  .get(generalCtrl.getVersion);
