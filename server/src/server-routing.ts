import * as path from 'path';
import { Router, Application } from 'express';
import { StaticRouter } from './routes/static/static.router';

import { GeneralRouter } from './routes/general';
import { Middlewares } from './tools/log-response-body';

export function configServerRouting(app: Application, internalApp: Application, io: any) {

  constructMainApp(app);
}

function constructMainApp(app) {
  const boilerRouter = Router({ caseSensitive: false });

  boilerRouter.use(StaticRouter);
  boilerRouter.use(Middlewares.responseBody);

  boilerRouter.use('/general', GeneralRouter);

  app.use('/api', boilerRouter);

  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
}
