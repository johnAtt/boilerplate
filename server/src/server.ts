import { Application, json, urlencoded } from 'express';
import { Server as HttpServer } from 'http';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { configServerRouting } from './server-routing';

process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`);
});

export class Server {
  app: Application;

  internalApp: Application;

  server: HttpServer;

  io;

  public static bootstrap(server: Server, app: Application, internalApp: Application, io): Server {
    return new Server(server, app, internalApp, io);
  }

  constructor(server, app, internalApp, io) {
    this.server = server;
    this.internalApp = internalApp;
    this.app = app;
    this.io = io;

    this.config();
    this.routes();
  }

  public config() {
    this.app.disable('x-powered-by');
    this.app.enable('trust proxy');
    morgan(':method :url :status :res[content-length] - :response-time ms');
    this.app.use(morgan('dev'));
    this.app.use(helmet());
    this.app.use(json({ limit: '25mb' }));
    this.app.use(urlencoded({ limit: '25mb', extended: true }));
  }

  private routes() {
    configServerRouting(this.app, this.internalApp, this.io);
  }
}
